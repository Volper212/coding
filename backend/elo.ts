export function calculateRatingChanges(
    playerRating: number,
    puzzleRating: number,
    playerWon: boolean
) {
    const transformedPlayerRating = 10 ** (playerRating / 400);
    const transformedPuzzleRating = 10 ** (puzzleRating / 400);
    const expectedPlayerScore =
        transformedPlayerRating / (transformedPlayerRating + transformedPuzzleRating);
    const expectedPuzzleScore =
        transformedPuzzleRating / (transformedPlayerRating + transformedPuzzleRating);
    const actualPlayerScore = playerWon ? 1 : 0;
    const actualPuzzleScore = playerWon ? 0 : 1;
    const k = 32;
    return {
        player: k * (actualPlayerScore - expectedPlayerScore),
        puzzle: k * (actualPuzzleScore - expectedPuzzleScore),
    };
}
