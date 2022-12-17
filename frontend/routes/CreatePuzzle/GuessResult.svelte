<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Categories from "./Elements/Categories.svelte";
    import SendButton from "./Elements/SendButton.svelte";

    import CodeEditor from "./Elements/CodeEditor.svelte";

    import Answer from "./Elements/Answer.svelte";

    let title = "",
        syntaxRating = false,
        algorithmRating = false,
        analyseRating = false,
        code = "",
        result = "";
</script>

<h2>Guess</h2>

<form
    on:submit|preventDefault={() =>
        CreatePuzzle(
            PuzzleType.WhatResult,
            title,
            "",
            syntaxRating,
            algorithmRating,
            analyseRating,
            code,
            0,
            result,
            0,
            0,
            []
        )}
>
    <PuzzleName bind:title />
    <Categories bind:syntaxRating bind:algorithmRating bind:analyseRating />
    <SendButton />

    <CodeEditor bind:code />

    <label>Wynik<input bind:value={result} /></label>
    <button type="submit">Wyslij</button>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
