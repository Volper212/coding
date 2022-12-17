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
        analiseRating = false,
        code = "",
        line = 0;
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
            analiseRating,
            code,
            line,
            "",
            0,
            0,
            []
        )}
>
    <PuzzleName bind:title />
    <Categories bind:syntaxRating bind:algorithmRating bind:analiseRating />
    <SendButton />

    <CodeEditor bind:code />

    <Answer bind:line />
    <button type="submit">Wyslij</button>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
