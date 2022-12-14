<script lang="ts">
    import api from "frontend/api";

    let username = "";
    let guessedCorrectly: boolean | undefined;

    async function guess() {
        guessedCorrectly = await api.example.isMyUsername.query(username);
    }
</script>

<p>Zgadnij swoją nazwę użytkownika:</p>
<form on:submit|preventDefault={guess}>
    <input type="text" required bind:value={username} />
    <button type="submit">Zgadnij</button>
</form>
{#if guessedCorrectly !== undefined}
    <output>{guessedCorrectly ? "Dobrze" : "Źle"}</output>
{/if}

{#await api.example.userId.query() then id}
    <p>Twoje id: {id}</p>
{/await}
