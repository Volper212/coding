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

<form
    on:submit|preventDefault={() => {
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
            tests
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

    <div class="inOut">
        {#each tests as test}
            <div>
                <label>
                    Wejście:
                    <input type="text" bind:value={test.input} />
                </label>
                <label>
                    Wyjście:
                    <input type="text" bind:value={test.output} />
                </label>
            </div>
        {/each}

        <button
            type="button"
            on:click={() => {
                tests = [...tests, { input: "", output: "" }];
            }}>+</button
        >
    </div>
</form>

<style lang="scss">
    @use "./Type.scss" as *;

    .inOut {
        > div {
            display: flex;
            flex-flow: column;

            margin-bottom: 2vw;
        }
    }
</style>
