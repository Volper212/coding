import { makeRouter, publicProcedure } from "backend/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { v4 as generateId } from "uuid";
import type { Database } from "backend/database";
import type { GetLoggedIn } from "backend/util/getLoggedIn";
import type express from "express";

export default function makeAuthenticationRouter(database: Database, getLoggedIn: GetLoggedIn) {
    return makeRouter({
        register: publicProcedure
            .input(
                z.object({
                    username: z.string().min(1),
                    email: z.string().email(),
                    password: z.string(),
                })
            )
            .mutation(async ({ input: { username, email, password }, ctx: { res } }) => {
                if (await database.users.findOne({ username }))
                    return "Nazwa użytkownika jest zajęta";
                await Promise.all([
                    database.users.insertOne({
                        username,
                        email,
                        passwordHash: await bcrypt.hash(password, 10),
                        rating: 1000,
                        syntaxRating: 1000,
                        algorithmRating: 1000,
                        analiseRating: 1000,
                        done: new Set<string>(),
                    }),
                    logIn(res, username),
                ]);
            }),

        logIn: publicProcedure
            .input(
                z.object({
                    username: z.string().min(1),
                    password: z.string(),
                })
            )
            .mutation(async ({ input: { username, password }, ctx: { res } }) => {
                const user = await database.users.findOne({ username });
                if (user == null || !(await bcrypt.compare(password, user.passwordHash)))
                    return "Niepoprawna nazwa użytkownika lub hasło";
                await logIn(res, username);
            }),

        loggedInUser: publicProcedure.query(async ({ ctx }) => (await getLoggedIn(ctx))?.username),

        logOut: publicProcedure.mutation(async ({ ctx }) => {
            const user = await getLoggedIn(ctx);
            if (user === undefined) return;
            const { token } = user;
            await database.sessions.deleteOne({ token });
        }),
    });

    async function logIn(res: express.Response, username: string) {
        const token = generateId();
        await database.sessions.insertOne({
            username,
            token,
        });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    }
}
