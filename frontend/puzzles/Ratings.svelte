<script lang="ts">
    import api from "frontend/api";
    export let points: number = 0;
    export let puzzlePoints: number;
    export let change: number = 0;
    export let puzzleChange: number;
</script>

<br />
Twoj ranking: {points + change} ({points}{change < 0 ? "" : "+"}{change})
<br />
Ranking zadania: {puzzlePoints + puzzleChange} ({puzzlePoints}{puzzleChange < 0
    ? ""
    : "+"}{puzzleChange})
