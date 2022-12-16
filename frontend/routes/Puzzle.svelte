<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    import api from "frontend/api";
    import FindBug from "frontend/puzzles/FindBug.svelte";
    import { PuzzleType } from "shared/types";

    let puzzle: AwaitableReturnType<typeof getNextPuzzle>;
    
    const getNextPuzzle = api.startPuzzle.query;

    loadPuzzle();

    async function loadPuzzle() {
        puzzle = await getNextPuzzle();
    }
</script>

{#if puzzle}
    {#if puzzle.type === PuzzleType.FindBug}
        <FindBug title={puzzle.title} description={puzzle.description} code={puzzle.code} />
    {/if}
{:else}
    <p>Brak zadań</p>
{/if}
