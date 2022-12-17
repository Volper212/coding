<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Categories from "./Elements/Categories.svelte";

    import CodeEditor from "./Elements/CodeEditor.svelte";

    import Answer from "./Elements/Answer.svelte";

    let title = "",
        syntaxRating = false,
        algorithmRating = false,
        analyseRating = false,
        code = "",
        result = "";
</script>

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
    <main>
        <div><PuzzleName bind:title /></div>
        <div style="width: 30vw;" />
        <div><Categories bind:syntaxRating bind:algorithmRating bind:analyseRating /></div>
        <div><button type="submit">Wyślij</button></div>
    </main>

    <div class="code">
        <CodeEditor bind:code />
    </div>

    <div>
        <label>Wynik<input bind:value={result} /></label>
    </div>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
