<script lang="ts">
    import api from "frontend/api";
    import { PuzzleType } from "../../shared/types";
    async function create() {
        //add puzzle to database
        try {
            api.createPuzzle.query({ type, description, code, bugLine });
        } catch (e) {
            console.log(e);
        }
        location.reload();
    }
    let type: PuzzleType;
    let description = "";
    let code = "";
    let bugLine = 0;
    function print() {
        console.log(type);
    }
</script>

<p>Stwórz zadanie:</p>
<form on:submit|preventDefault={create}>
    <label>
        <select bind:value={type} on:change={print}>
            <option value={PuzzleType.FindBug}>Znajdź Błąd</option>
            <option value={PuzzleType.WriteProgram}>Napisz program</option>
            <option value={PuzzleType.FillGap}>Uzupełnij Lukę</option>
            <option value={PuzzleType.WhatResult}>Co się wyświetli?</option>
        </select>
    </label>
    <label>Opis<textarea bind:value={description} /></label>
    <label>Kod<textarea bind:value={code} /></label>
    {#if type == PuzzleType.FindBug}
        <label>Numer błędnej linii<input type="number" bind:value={bugLine} /></label>
    {/if}
    <button type="submit">Wyslij</button>
</form>
