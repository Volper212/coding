<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Description from "./Elements/Description.svelte";
    import Categories from "./Elements/Categories.svelte";

    import CodeEditor from "./Elements/CodeEditor.svelte";

    import Answer from "./Elements/Answer.svelte";

    let title = "",
        description = "",
        syntaxRating = false,
        algorithmRating = false,
        analyseRating = false,
        code = "",
        line = 0,
        start = 0,
        end = 0;
</script>

<form
    on:submit|preventDefault={() => {
        CreatePuzzle(
            PuzzleType.FillGap,
            title,
            description,
            syntaxRating,
            algorithmRating,
            analyseRating,
            code,
            line,
            "",
            start,
            end,
            []
        );
        location.replace("/");
    }}
>
    <main>
        <div><PuzzleName bind:title /></div>
        <div><Description bind:description /></div>
        <div><Categories bind:syntaxRating bind:algorithmRating bind:analyseRating /></div>
        <div><button type="submit">Wyślij</button></div>
    </main>
    <div class="code">
        <CodeEditor bind:code />
    </div>

    <div>
        <Answer fill={true} bind:start bind:end label="Linia z luką" bind:line />
    </div>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
