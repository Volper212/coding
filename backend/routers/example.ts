import type Dependencies from "backend/dependencies";
import { makeRouter, publicProcedure } from "backend/trpc";
import { z } from "zod";

const makeExampleRouter = ({ database, userProcedure }: Dependencies) =>
    makeRouter({
        userId: userProcedure.query(async ({ ctx: { username } }) => {
            const user = await database.users.findOne({ username });
            if (user === null) throw new Error("User not found");
            return user._id;
        }),
        isMyUsername: userProcedure
            .input(z.string().min(1))
            .query(({ctx:{username}, input}) => {
                console.log("username:" + username)
                console.log("input:" + input)
                return username === input
            }),
    });

export default makeExampleRouter;
