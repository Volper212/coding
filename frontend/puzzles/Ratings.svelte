<script lang="ts">
    import api from "frontend/api";
    export let points: number = 0;
    export let puzzlePoints: number;
    let change = 0;
</script>

<br />
Twoj ranking: {points + change} ({points}+change)
<br />
Ranking zadania: {puzzlePoints} ({puzzlePoints}+change)
