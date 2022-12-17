<script lang="ts">
    import type { AwaitableReturnType } from "backend/util/AwaitableReturnType";
    import api from "frontend/api";
    import Ratings from "./Ratings.svelte";
    export let title: string;
    export let description: string;
    export let code: string;
    export let _id: string;
    export let line: number;
    export let start: number;
    export let end: number;
    export let func: () => void;
    let value = "";
    console.log(code);
    let finish = false;
    let res: AwaitableReturnType<typeof api.checkFilledGap.query>;
    async function check() {
        res = await api.checkFilledGap.query({ _id, gapInput: value });
        finish = true;
    }
</script>

{#if finish}
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
    <button on:click={func} style="color:white">Graj dalej</button>
{:else}
    <h1>{title}</h1>
    <p>{description}</p>
    {#each code.split("\n") as line1, id}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if id == line}
            <p style="background-color: gray">
                {line1.substring(0, start)}<input
                    bind:value
                    maxLength={end - start + 1}
                />{line1.substring(end)}
            </p>
        {:else}
            <p style="background-color: gray">{line1}</p>
        {/if}
    {/each}
{/if}
<button type="submit" on:click={check}>Wyslij</button>
