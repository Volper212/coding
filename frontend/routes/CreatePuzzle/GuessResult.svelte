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
        analiseRating = false,
        code = "",
        line = 0;
</script>

<form on:submit|preventDefault={() => CreatePuzzle(PuzzleType.WhatResult, title, "", syntaxRating, algorithmRating, analiseRating, code, line, "", 0, 0)}>
    <main>
        <div><PuzzleName bind:title /></div>
        <div style="width: 30vw;" />
        <div><Categories bind:syntaxRating bind:algorithmRating bind:analiseRating /></div>
        <div><button type="submit">Wyślij</button></div>
    </main>

    <div class="code">
        <CodeEditor bind:code />
    </div>

    <div>
        <Answer bind:line />
    </div>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
