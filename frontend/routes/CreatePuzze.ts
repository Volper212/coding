import api from "frontend/api";
import { PuzzleType } from "../../shared/types";

export default async function CreatePuzzle(
    type: number,
    title: string,
    description: string,
    syntaxRating: boolean,
    algorithmRating: boolean,
    analyseRating: boolean,
    code: string,
    line: number,
    result: string,
    start: number,
    end: number,
    tests: { input: string; output: string }[]
) {
    switch (type) {
        case PuzzleType.FindBug:
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analyseRating,
                title,
                type,
                description,
                code,
                bugLine: line,
            });
            break;
        case PuzzleType.WriteProgram:
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analyseRating,
                title,
                type,
                description,
                tests,
            });
            break;
        case PuzzleType.FillGap:
            let word = code.split("\n")[line].slice(start, end);
            console.log(word);
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analyseRating,
                description,
                title,
                type,
                code,
                line,
                start,
                end,
                word,
            });
            break;
        case PuzzleType.WhatResult:
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analyseRating,
                title,
                type,
                code,
                result,
            });
            break;
    }
    location.replace("/");
}
