export const enum PuzzleType {
    FindBug,
    WriteProgram,
    FillGap,
    WhatResult,
}

export type RawPuzzle =
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
      };
