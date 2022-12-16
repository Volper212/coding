import type { rawPuzzle } from "backend/app";
import type { z } from "zod";

export const enum PuzzleType {
    FindBug,
    WriteProgram,
    FillGap,
    WhatResult,
}

export type RawPuzzle = z.infer<typeof rawPuzzle>;
