import { MongoClient } from "mongodb";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";

export default async function getDatabase() {
    const client = await new MongoClient(
        process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017"
    ).connect();
    const database = client.db("coding");
    return {
        users: database.collection<User>("users"),
        sessions: database.collection<Session>("sessions"),
        puzzles: database.collection<Puzzle>("puzzles"),
    };
}

export type Database = AwaitableReturnType<typeof getDatabase>;

type User = {
    username: string;
    email: string;
    passwordHash: string;
    rating: number;
};

type Session = {
    username: string;
    token: string;
};

enum PuzzleType {
    FindBug,
    WriteProgram,
    FillGap,
    WhatResult,
}

type Puzzle = {
    rating: number;
} & (
    | {
          type: PuzzleType.FindBug;
          description: string;
          code: string;
          bugLine: number;
      }
    | {
          type: PuzzleType.WriteProgram;
      }
    | {
          type: PuzzleType.FillGap;
      }
    | {
          type: PuzzleType.WhatResult;
      }
);
