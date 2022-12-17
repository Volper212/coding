<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Description from "./Elements/Description.svelte";
    import Categories from "./Elements/Categories.svelte";
    import SendButton from "./Elements/SendButton.svelte";

    let title = "",
        description = "",
        syntaxRating = false,
        algorithmRating = false,
        analiseRating = false;

    let tests: { input: string; output: string }[] = [];
</script>

<h2>Program</h2>

<form
    on:submit|preventDefault={() =>
        CreatePuzzle(
            PuzzleType.WriteProgram,
            title,
            description,
            syntaxRating,
            algorithmRating,
            analiseRating,
            "",
            0,
            "",
            0,
            0,
            []
        )}
>
    <PuzzleName bind:title />
    <Description bind:description />
    {#each tests as test}
        <label>
            Wejście:
            <input type="text" bind:value={test.input} />
        </label>
        <label>
            Wyjście:
            <input type="text" bind:value={test.output} />
        </label>
    {/each}
    <button
        type="button"
        on:click={() => {
            tests = [...tests, { input: "", output: "" }];
        }}>+</button
    >
    <Categories bind:syntaxRating bind:algorithmRating bind:analiseRating />
    <SendButton />
    <button type="submit">Wyslij</button>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
