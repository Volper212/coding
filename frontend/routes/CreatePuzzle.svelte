<script lang="ts">
    import api from "frontend/api";
    import { PuzzleType } from "../../shared/types";
    async function create() {
        //add puzzle to database

        try {
            switch (type) {
                case PuzzleType.FindBug:
                    api.createPuzzle.query({ title, type, description, code, bugLine: line });
                    break;
                case PuzzleType.WriteProgram:
                    //api.createPuzzle.query({ title, type, description, code, bugLine });
                    break;
                case PuzzleType.FillGap:
                    //api.createPuzzle.query({ title, type, code, line, start, end });
                    break;
                case PuzzleType.WhatResult:
                    break;
            }
        } catch (e) {
            console.log(e);
        }
        location.reload();
    }
    let type: PuzzleType;
    let description = "";
    let code = "";
    let line = 0;
    let start = 0;
    let end = 0;

    let title = "";
    function print() {
        console.log(type);
    }
</script>

<p>Stwórz zadanie:</p>
<form on:submit|preventDefault={create}>
    <label>Nazwa zadania<input bind:value={title} /></label>
    <label
        >Typ zadania
        <select bind:value={type} on:change={print}>
            <option value={PuzzleType.FindBug}>Znajdź Błąd</option>
            <option value={PuzzleType.WriteProgram}>Napisz program</option>
            <option value={PuzzleType.FillGap}>Uzupełnij Lukę</option>
            <option value={PuzzleType.WhatResult}>Co się wyświetli?</option>
        </select>
    </label>
    {#if type == PuzzleType.FindBug}
        <label>Numer błędnej linii<input type="number" bind:value={line} /></label>
        <label>Opis<textarea bind:value={description} /></label>
    {/if}
    {#if type == PuzzleType.FindBug || type == PuzzleType.FillGap}
        <label>Kod<textarea bind:value={code} /></label>
    {/if}
    {#if type == PuzzleType.FillGap}
        <label>Numer linii<input type="number" bind:value={line} /></label>
        <label>Od znaku<input type="number" bind:value={start} /></label>
        <label>Do znaku<input type="number" bind:value={end} /></label>
    {/if}

    <!-- <input type="text" required bind:value={username} /> -->

    <button type="submit">Wyslij</button>
</form>
