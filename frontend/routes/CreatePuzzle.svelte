<script lang="ts">
    import api from "frontend/api";

    let username = "";
    let guessedCorrectly: boolean | undefined;

    async function create() {
        //add puzzle to database
        //guessedCorrectly = await api.example.isMyUsername.query(username);
    }
    let type: string = "0";

    function print() {
        console.log(type);
    }
</script>

<p>Stwórz zadanie:</p>
<form on:submit|preventDefault={create}>
    <select bind:value={type} on:change={print}>
        <option value="0">Znajdź Błąd</option>
        <option value="1">Napisz program</option>
        <option value="2">Uzupełnij Lukę</option>
        <option value="3">Co się wyświetli?</option>
    </select>
    <textarea />

    <input type="text" required bind:value={username} />

    <button type="submit">Wyslij</button>
</form>
