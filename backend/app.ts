import express from "express";
import { makeRouter, makeTRPCExpressMiddleware } from "./trpc";
import dotenv from "dotenv";
import makeAuthenticationRouter from "./routers/authentication";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";
import getDatabase, { type Puzzle, type User } from "./database";
import makeGetLoggedIn from "./util/getLoggedIn";
import makeUserProcedure from "./util/userProdecure";
import makeExampleRouter from "./routers/example";
import { PuzzleType } from "../shared/types";
import { z } from "zod";
import { ObjectId, type WithId } from "mongodb";
import { calculateRatingChanges } from "./elo";
import _ from "lodash";

import { getContext } from "svelte";

const flatness = 100;

export const rawPuzzle = z
    .object({
        type: z.literal(PuzzleType.FindBug),
        description: z.string(),
        code: z.string(),
        bugLine: z.number(),
    })
    .or(
        z.object({
            type: z.literal(PuzzleType.WriteProgram),
            description: z.string(),
            tests: z
                .object({
                    input: z.string(),
                    output: z.string(),
                })
                .array(),
        })
    )
    .or(
        z.object({
            type: z.literal(PuzzleType.FillGap),
            description: z.string(),
            code: z.string(),
            line: z.number(),
            start: z.number(),
            end: z.number(),
            word: z.string(),
        })
    )
    .or(z.object({ type: z.literal(PuzzleType.WhatResult), code: z.string(), result: z.string() }));
async function main() {
    const database = await getDatabase();
    const getLoggedIn = makeGetLoggedIn(database);
    const userProcedure = makeUserProcedure(getLoggedIn);
    const dependencies = { database, userProcedure };
    const router = makeRouter({
        authentication: makeAuthenticationRouter(database, getLoggedIn),
        example: makeExampleRouter(dependencies),
        createPuzzle: userProcedure
            .input(
                z
                    .object({
                        title: z.string().min(1).max(20),
                        syntaxRating: z.boolean(),
                        algorithmRating: z.boolean(),
                        analyseRating: z.boolean(),
                    })
                    .and(rawPuzzle)
            )
            .query(async ({ ctx: { username }, input }) => {
                await database.puzzles.insertOne({
                    author: username,
                    ...input,
                    rating: 1000,
                    views: 0,
                });
            }),
        startPuzzle: userProcedure.query(async ({ ctx: { username } }) => {
            const user = await database.users.findOne({ username });
            if (user == null) throw new Error("User not found");
            while (true) {
                const puzzle = (await database.puzzles
                    .aggregate([
                        {
                            $match: {
                                _id: {
                                    $not: { $in: user.done.map((value) => new ObjectId(value)) },
                                },
                            },
                        },
                        { $sample: { size: 1 } },
                    ])
                    .next()) as WithId<Puzzle> | null;
                if (puzzle == null) return;
                const ratingDifference = puzzle.rating - user.rating;
                const probability = Math.exp(-0.5 * (ratingDifference / flatness) ** 2) / flatness; // Normal distribution
                if (Math.random() < probability * 30) {
                    await database.puzzles.updateOne({ _id: puzzle._id }, { $inc: { views: 1 } });
                    const { rating, author, ...rawPuzzle } = puzzle;
                    switch (rawPuzzle.type) {
                        case PuzzleType.FindBug: {
                            const { bugLine, ...raw } = rawPuzzle;
                            return raw;
                        }
                        case PuzzleType.WriteProgram:
                            const { tests, ...raw } = rawPuzzle;
                            return raw;
                        case PuzzleType.FillGap:
                            return rawPuzzle;
                        case PuzzleType.WhatResult: {
                            const { title, ...raw } = rawPuzzle;
                            return raw;
                        }
                    }
                }
            }
        }),
        findBugCheck: userProcedure
            .input(z.object({ id: z.string(), line: z.number() }))
            .query(async ({ ctx: { username }, input }) => {
                const puzzle = await getPuzzle(input.id);
                if (puzzle.type != PuzzleType.FindBug) throw "Wrong type";

                const success = puzzle.bugLine === input.line;

                return results(puzzle, success, username, input.id);
            }),

        checkWhatResult: userProcedure
            .input(z.object({ _id: z.string(), guess: z.string() }))
            .query(async ({ ctx: { username }, input: { _id, guess } }) => {
                const puzzle = await getPuzzle(_id);
                if (puzzle.type != PuzzleType.WhatResult) throw "Wrong type";

                const success = guess === puzzle.result;

                return results(puzzle, success, username, _id);
            }),

        getInputs: userProcedure
            .input(z.string())
            .query(async ({ ctx: { username }, input: _id }) => {
                await database.users.updateOne(
                    { username },
                    { $set: { lastPuzzleRecieval: { _id, time: Date.now() } } }
                );
                const puzzle = await getPuzzle(_id);
                if (puzzle.type !== PuzzleType.WriteProgram) throw "Wrong type";
                return puzzle.tests.map(({ input }) => input);
            }),

        checkProgram: userProcedure
            .input(z.string().array())
            .query(async ({ ctx: { username }, input: outputs }) => {
                const user = await database.users.findOne({ username });
                if (user == null) throw new Error("User not found");
                if (user.lastPuzzleRecieval == null) throw new Error("No puzzle");
                if (Date.now() - 5000 > user.lastPuzzleRecieval.time) throw new Error("Too slow");
                const puzzle = await getPuzzle(user.lastPuzzleRecieval._id);
                if (puzzle.type !== PuzzleType.WriteProgram) throw "Wrong type";
                const success = _.isEqual(
                    puzzle.tests.map(({ output }) => output),
                    outputs
                );
                return results(puzzle, success, username, user.lastPuzzleRecieval._id);
            }),

        getUsers: userProcedure.query(() => {
            return database.users.find().toArray();
        }),

        getPuzzles: userProcedure
            .input(z.object({ type: z.number(), author: z.string() }))
            .query(({ input: { type, author } }) => {
                return database.puzzles.find({ type, author }).toArray();
            }),

        checkFilledGap: userProcedure
            .input(z.object({ _id: z.string(), gapInput: z.string() }))
            .query(async ({ ctx: { username }, input: { _id, gapInput } }) => {
                const puzzle = await getPuzzle(_id);
                if (puzzle.type != PuzzleType.FillGap) throw "Wrong type";

                const success = gapInput === puzzle.word;

                return results(puzzle, success, username, _id);
            }),
        getUserRatings: userProcedure.query(async ({ ctx: { username } }) => {
            const user = await database.users.findOne({ username });
            return [user?.rating, user?.syntaxRating, user?.algorithmRating, user?.analyseRating];
        }),
    });
    const app = express();
    app.use(express.static("frontend/public"));
    app.use("/trpc", makeTRPCExpressMiddleware(router));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "frontend/public" });
    });
    app.listen(process.env.PORT ?? 3000);

    return router;

    async function getPuzzle(id: string) {
        const puzzle = await database.puzzles.findOne({ _id: new ObjectId(id) });
        if (puzzle == null) throw "No puzzle found";
        return puzzle;
    }

    async function results(puzzle: Puzzle, success: boolean, username: string, _id: string) {
        const user = await database.users.findOne({ username });
        if (user == null) throw "";
        if (user.done.includes(_id)) throw "";

        const oldPoints = { playerRating: user.rating, puzzleRating: puzzle.rating };
        const newPoints = calculateRatingChanges(
            oldPoints.playerRating,
            oldPoints.puzzleRating,
            success
        );
        await database.users.updateOne(
            { username },
            { $inc: { rating: newPoints.player }, $push: { done: _id } }
        );
        await database.puzzles.updateOne(
            { _id: new ObjectId(_id) },
            { $inc: { rating: newPoints.puzzle } }
        );
        return {
            ...oldPoints,
            ...newPoints,
            success,
        };
    }
}

dotenv.config();
main();

export type Router = AwaitableReturnType<typeof main>;
