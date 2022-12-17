<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    import api from "frontend/api";
    import Ratings from "./Ratings.svelte";

    export let _id: string;
    export let title: string;
    export let description: string;

    let inputs: string[];
    let code = "";
    let res: AwaitableReturnType<typeof api.checkProgram.query>;

    async function check() {
        inputs = await api.getInputs.query(_id);
        const script = new Function("value", code);
        res = await api.checkProgram.query(inputs.map((value) => `${script(value)}`));
    }
</script>

{#if res !== undefined}
    {#if res.success}
        Sukces
        <Ratings
            points={res.playerRating}
            puzzlePoints={res.puzzleRating}
            change={res.player}
            puzzleChange={res.puzzle}
        />
    {:else}
        Tym razem ci się nie udało
        <Ratings
            points={res.playerRating}
            puzzlePoints={res.puzzleRating}
            change={res.player}
            puzzleChange={res.puzzle}
        />
    {/if}
{:else}
    <h1>{title}</h1>
    <p>{description}</p>
    <p>Wejście znajduje się w zmiennej value</p>
    <p>Wyjście - return</p>
    <form on:submit|preventDefault={check}>
        <textarea bind:value={code} />
        <button type="submit">Sprawdź</button>
    </form>
{/if}
