import { MongoClient } from "mongodb";
import type { AwaitableReturnType } from "./util/AwaitableReturnType";
import type { RawPuzzle } from "../shared/types";

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

export type User = {
    username: string;
    email: string;
    passwordHash: string;
    rating: number;
    syntaxRating: number;
    algorithmRating: number;
    analyseRating: number;
    done: string[];
    lastPuzzleRecieval?: {
        _id: string;
        time: number;
    };
};

type Session = {
    username: string;
    token: string;
};

export type Puzzle = {
    title: string;
    views: number;
    rating: number;
    author: string;
    syntaxRating: boolean;
    algorithmRating: boolean;
    analyseRating: boolean;
} & RawPuzzle;
