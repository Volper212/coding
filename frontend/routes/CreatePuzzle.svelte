<script lang="ts">
    import api from "frontend/api";
    import { PuzzleType } from "../../shared/types";

    async function create() {
        //add puzzle to database
        //guessedCorrectly = await api.example.isMyUsername.query(username);
    }
    let type: PuzzleType;
    function print() {
        console.log(type);
    }
</script>

<p>Stwórz zadanie:</p>
<form on:submit|preventDefault={create}>
    <select bind:value={type} on:change={print}>
        <option value={PuzzleType.FindBug}>Znajdź Błąd</option>
        <option value={PuzzleType.WriteProgram}>Napisz program</option>
        <option value={PuzzleType.FillGap}>Uzupełnij Lukę</option>
        <option value={PuzzleType.WhatResult}>Co się wyświetli?</option>
    </select>
    <textarea />
    <!-- <input type="text" required bind:value={username} /> -->

    <button type="submit">Wyslij</button>
</form>
