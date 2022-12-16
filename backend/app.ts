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

const flatness = 10;

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
            
        })
    )
    .or(
        z.object({
            type: z.literal(PuzzleType.FillGap),
            code: z.string(),
            line: z.number(),
            start: z.number(),
            end: z.number(),
        })
    )
    .or(z.object({ type: z.literal(PuzzleType.WhatResult) }));
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
                z.object({ title: z.string().min(1).max(20) }).and(
                    rawPuzzle
                )
            )
            .query(async ({ ctx: { username }, input }) => {
                await database.puzzles.insertOne({
                    author: username,
                    ...input,
                    rating: 1000,
                });
            }),
        startPuzzle: userProcedure.query(async ({ ctx: { username } }) => {
            const user = await database.users.findOne({ username });
            if (user == null) throw new Error("User not found");
            let chance: number;
            let puzzle: Puzzle;
            while (true) {
                const puzzleOption = await database.puzzles.findOne({ $sample: { size: 1 } });
                if (puzzleOption == null) return;
                puzzle = puzzleOption;
                const ratingDifference = puzzle.rating - user.rating;
                const probability = Math.exp(-0.5 * (ratingDifference / flatness) ** 2) / flatness; // Normal distribution
                console.log(probability);
                break;
            }
            const { rating, ...rawPuzzle } = puzzle;
            return rawPuzzle;
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
