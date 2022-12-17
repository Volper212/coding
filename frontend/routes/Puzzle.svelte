<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    import api from "frontend/api";
    import FillGap from "frontend/puzzles/FillGap.svelte";
    import FindBug from "frontend/puzzles/FindBug.svelte";
    import WhatResult from "frontend/puzzles/WhatResult.svelte";
    import WriteProgram from "frontend/puzzles/WriteProgram.svelte";
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
        <FindBug
            title={puzzle.title}
            description={puzzle.description}
            code={puzzle.code}
            _id={puzzle._id}
            func={loadPuzzle}
        />
    {:else if puzzle.type === PuzzleType.WhatResult}
        <WhatResult func={loadPuzzle} _id={puzzle._id} code={puzzle.code} />
    {:else if puzzle.type === PuzzleType.WriteProgram}
        <WriteProgram
            func={loadPuzzle}
            _id={puzzle._id}
            title={puzzle.title}
            description={puzzle.description}
        />
    {:else if puzzle.type === PuzzleType.FillGap}
        <FillGap
            description={puzzle.description}
            func={loadPuzzle}
            title={puzzle.title}
            _id={puzzle._id}
            code={puzzle.code}
            line={puzzle.line}
            start={puzzle.start}
            end={puzzle.end}
        />
    {/if}
{:else}
    <p>Brak zadań</p>
{/if}
