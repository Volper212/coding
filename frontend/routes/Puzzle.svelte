<script lang="ts">
    import api from "frontend/api";
    import type { RawPuzzle } from "shared/types";

    let puzzle: RawPuzzle;

    async function loadPuzzle() {
        puzzle = await getNextPuzzle();
    }

    const getNextPuzzle = api.startPuzzle.query;

    $: console.log(puzzle);
</script>

{#if puzzle}
    <p>Znaleziono zadanie</p>
{:else}
    <p>Brak zadań</p>
{/if}
