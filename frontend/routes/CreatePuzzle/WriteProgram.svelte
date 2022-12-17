<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Description from "./Elements/Description.svelte";
    import Categories from "./Elements/Categories.svelte";

    let title = "",
        description = "",
        syntaxRating = false,
        algorithmRating = false,
        analyseRating = false;

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
            analyseRating,
            "",
            0,
            "",
            0,
            0,
            []
        )}
>
    <main>
        <div><PuzzleName bind:title /></div>
        <div><Description bind:description /></div>
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
        <div><Categories bind:syntaxRating bind:algorithmRating bind:analyseRating /></div>
        <div><button type="submit">Wyślij</button></div>
    </main>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
