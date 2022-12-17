import express from "express";
import { makeRouter, makeTRPCExpressMiddleware } from "./trpc";
import dotenv from "dotenv";
import makeAuthenticationRouter from "./routers/authentication";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";
import getDatabase, { type Puzzle } from "./database";
import makeGetLoggedIn from "./util/getLoggedIn";
import makeUserProcedure from "./util/userProdecure";
import makeExampleRouter from "./routers/example";
import { PuzzleType } from "../shared/types";
import { z } from "zod";
import { ObjectId, type WithId } from "mongodb";
import { calculateRatingChanges } from "./elo";

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
            //inputs & outputs
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
                        analiseRating: z.boolean(),
                    })
                    .and(rawPuzzle)
            )
            .query(async ({ ctx: { username }, input }) => {
                if (!input.syntaxRating && !input.algorithmRating && !input.analiseRating)
                    throw "Check at least one category";
                await database.puzzles.insertOne({
                    author: username,
                    ...input,
                    rating: 1000,
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
                    const { rating, author, ...rawPuzzle } = puzzle;
                    switch (rawPuzzle.type) {
                        case PuzzleType.FindBug: {
                            const { bugLine, ...raw } = rawPuzzle;
                            return raw;
                        }
                        case PuzzleType.WriteProgram:
                            return rawPuzzle;
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
                const puzzle = await database.puzzles.findOne({ _id: new ObjectId(input.id) });
                const user = await database.users.findOne({ username });
                if (puzzle == null) throw "No puzzle found";
                if (puzzle.type != PuzzleType.FindBug) throw "Wrong type";

                if (user == null) throw "";
                await database.users.updateOne({ username }, { $push: { done: input.id } });
                const oldPoints = { playerRating: user.rating, puzzleRating: puzzle.rating };
                const newPoints = calculateRatingChanges(
                    oldPoints.playerRating,
                    oldPoints.puzzleRating,
                    puzzle.bugLine != input.line
                );
                return {
                    ...oldPoints,
                    ...newPoints,
                    success: puzzle.bugLine != input.line,
                };
            }),

        checkWhatResult: userProcedure
            .input(z.object({ _id: z.string(), guess: z.string() }))
            .query(async ({ ctx: { username }, input: { _id, guess } }) => {
                const puzzle = await database.puzzles.findOne({ _id: new ObjectId(_id) });
                if (puzzle == null) throw new Error("Puzzle not found");
                if (puzzle.type !== PuzzleType.WhatResult)
                    throw new Error("Puzzle is not WhatResult");
                const { result } = puzzle;
                await database.users.updateOne({ username }, { $push: { done: _id } });
                if (guess === result) {
                    return puzzle;
                }
                return false;
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
}

dotenv.config();
main();

export type Router = AwaitableReturnType<typeof main>;
