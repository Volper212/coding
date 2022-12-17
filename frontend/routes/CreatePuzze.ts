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
            console.log(code);
            let word = code.split("\n")[line].substring(start, end + 1);
            console.log(word);
            let codeArr = code.split("\n");
            codeArr[line] =
                codeArr[line].slice(0, start) +
                " ".repeat(end - start + 1) +
                codeArr[line].slice(end + 1);
            code = codeArr.join("\n");
            console.log(code);
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
    //location.replace("/");
}
