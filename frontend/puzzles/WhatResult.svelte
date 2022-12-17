<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    import api from "frontend/api";
    import Ratings from "./Ratings.svelte";

    export let _id: string;
    export let code: string;

    let guess = "";
    let res: AwaitableReturnType<typeof api.checkWhatResult.query>;

    async function check() {
        res = await api.checkWhatResult.query({ _id, guess });
    }
</script>

<code>{code}</code>
<form on:submit|preventDefault={check}>
    <label>
        Co się wyświetli?
        <input type="text" bind:value={guess} />
    </label>
    <button type="submit">Sprawdź</button>
</form>

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
{/if}
