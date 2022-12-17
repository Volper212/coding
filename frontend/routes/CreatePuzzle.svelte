<script lang="ts">
    import { PuzzleType } from "../../shared/types";

    import SwitchType from "./CreatePuzzle/SwitchType.svelte";
    import FindMistake from "./CreatePuzzle/FindMistake.svelte";
    import WriteProgram from "./CreatePuzzle/WriteProgram.svelte";
    import FillGap from "./CreatePuzzle/FillGap.svelte";
    import GuessResult from "./CreatePuzzle/GuessResult.svelte";
    import { retryDelay } from "@trpc/client/dist/internals/retryDelay";

    let puzzleType = PuzzleType.FindBug;
</script>

<main>
    <div><SwitchType bind:puzzleType /></div>
    
    {#if puzzleType == PuzzleType.FindBug}
        <div><FindMistake /></div>
    {:else if puzzleType == PuzzleType.WriteProgram}
        <div><WriteProgram /></div>
    {:else if puzzleType == PuzzleType.FillGap}
        <div><FillGap /></div>
    {:else if puzzleType == PuzzleType.WhatResult}
        <div><GuessResult /></div>
    {/if}
</main>

<style lang="scss">
    main {
        margin: 0 3vw;
        height: 75vh;

        div {
            margin-top: 1vw;
        }
    }
</style>