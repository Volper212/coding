import express from "express";
import { makeRouter, makeTRPCExpressMiddleware } from "./trpc";
import dotenv from "dotenv";
import makeAuthenticationRouter from "./routers/authentication";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";
import getDatabase from "./database";
import makeGetLoggedIn from "./util/getLoggedIn";
import makeUserProcedure from "./util/userProdecure";
import makeExampleRouter from "./routers/example";
import { PuzzleType } from "../shared/types";
import { z } from "zod";
import { Db } from "mongodb";

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
                        type: z.literal(PuzzleType.FindBug),
                        description: z.string(),
                        code: z.string(),
                        bugLine: z.number(),
                    })
                    .or(z.object({ type: z.literal(PuzzleType.WriteProgram) }))
                    .or(z.object({ type: z.literal(PuzzleType.FillGap) }))
                    .or(z.object({ type: z.literal(PuzzleType.WhatResult) }))
            )
            .query(async ({ ctx: { username }, input }) => {
                await database.puzzles.insertOne({
                    author: username,
                    ...input,
                    rating: 1000,
                });
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
