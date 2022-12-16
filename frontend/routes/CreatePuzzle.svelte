<script lang="ts">
    import api from "frontend/api";

    let username = "";
    let guessedCorrectly: boolean | undefined;

    async function create() {
        //add puzzle to database
        //guessedCorrectly = await api.example.isMyUsername.query(username);
    }
</script>

<p>Stwórz zadanie:</p>
<form on:submit|preventDefault={create}>
    <select>
        <option>Znajdź Błąd</option>
        <option>Napisz program</option>
        <option>Uzupełnij Lukę</option>
        <option>Co się wyświetli?</option>
    </select>

    <input type="text" required bind:value={username} />

    <button type="submit">Zgadnij</button>
</form>
