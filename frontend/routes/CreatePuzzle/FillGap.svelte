<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Description from "./Elements/Description.svelte";
    import Categories from "./Elements/Categories.svelte";
    import SendButton from "./Elements/SendButton.svelte";

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

<h2>Gap</h2>

<form
    on:submit|preventDefault={() =>
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
        )}
>
    <PuzzleName bind:title />
    <Description bind:description />
    <Categories bind:syntaxRating bind:algorithmRating bind:analyseRating />
    <SendButton />

    <CodeEditor bind:code />

    <Answer bind:line label="Linia z luką" />
    <label>Pierwszy znak<input type="number" bind:value={start} /></label>
    <label>Ostatni znak<input type="number" bind:value={end} /></label>
    <button type="submit">Wyslij</button>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
