<script lang="ts">
    import type { Puzzle } from "backend/database";
    import api from "frontend/api";

    export let _id: string;
    export let code: string;

    let guess = "";
    let guessedCorrectly: Puzzle | false;

    async function check() {
        guessedCorrectly = await api.checkWhatResult.query({ _id, guess });
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

{#if guessedCorrectly !== undefined}
    {#if guessedCorrectly}
        <output>Dobrze</output>
    {:else}
        <output>Źle</output>
    {/if}
{/if}
