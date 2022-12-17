<script lang="ts">
    import { PuzzleType } from "../../shared/types";

    import SwitchType from "./CreatePuzzle/SwitchType.svelte";
    import FindMistake from "./CreatePuzzle/FindMistake.svelte";
    import WriteProgram from "./CreatePuzzle/WriteProgram.svelte";
    import FillGap from "./CreatePuzzle/FillGap.svelte";
    import GuessResult from "./CreatePuzzle/GuessResult.svelte";

    let puzzleType = PuzzleType.FindBug;
</script>

<SwitchType bind:puzzleType />

{#if puzzleType == PuzzleType.FindBug}
    <FindMistake />
{:else if puzzleType == PuzzleType.WriteProgram}
    <WriteProgram />
{:else if puzzleType == PuzzleType.FillGap}
    <FillGap />
{:else if puzzleType == PuzzleType.WhatResult}
    <GuessResult />
{/if}
