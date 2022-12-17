import api from "frontend/api";
import { PuzzleType } from "../../shared/types";

export default async function CreatePuzzle(
    type: number,
    title: string,
    description: string,
    syntaxRating: boolean,
    algorithmRating: boolean,
    analiseRating: boolean,
    code: string,
    line: number,
    result: string,
    start: number,
    end: number
) {
    switch (type) {
        case PuzzleType.FindBug:
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analiseRating,
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
                analiseRating,
                title,
                type,
                description /*inputs outputs*/,
            });
            break;
        case PuzzleType.FillGap:
            console.log(code);
            let word = code.split("\n")[line].substring(start, end);
            console.log(word);
            let codeArr = code.split("\n");
            codeArr[line] =
                codeArr[line].slice(0, start) +
                " ".repeat(end - start) +
                codeArr[line].slice(end - 1);
            code = codeArr.join("\n");
            console.log(code);
            api.createPuzzle.query({
                syntaxRating,
                algorithmRating,
                analiseRating,
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
                analiseRating,
                title,
                type,
                code,
                result,
            });
            break;
    }
    //location.replace("/");
}
