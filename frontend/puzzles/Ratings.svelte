<script lang="ts">
    import RoundNumber from "frontend/RoundNumber";

    export let points: number = 0;
    export let puzzlePoints: number;
    export let change: number = 0;
    export let puzzleChange: number;
</script>

<br />
Twoj ranking: {RoundNumber(points + change, 0)} ({RoundNumber(points, 0)}{change < 0
    ? ""
    : "+"}{RoundNumber(change, 0)})
<br />
Ranking zadania: {RoundNumber(puzzlePoints + puzzleChange, 0)} ({RoundNumber(
    puzzlePoints,
    0
)}{puzzleChange < 0 ? "" : "+"}{RoundNumber(puzzleChange, 0)})
