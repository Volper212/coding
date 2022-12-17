<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    //import api from "frontend/api";
    import Ratings from "./Ratings.svelte";
    export let title: string;
    export let description: string;
    export let code: string;
    export let _id: string;
    export let func: () => void;
    console.log(code);
    let finish = false;
    //let res: AwaitableReturnType<typeof api.findBugCheck.query>;
    async function check(id: number) {
        //res = await api.findBugCheck.query({ id: _id, line: id });
        //resfinish = true;
    }
</script>

{#if finish}
    <!-- {#if res.success}
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
    {/if} -->
    <button on:click={func} style="color:white">Graj dalej</button>
{:else}
    <h1>{title}</h1>
    <p>{description}</p>
    {#each code.split("\n") as line, id}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <p style="background-color: gray">{line}</p>
    {/each}
{/if}
