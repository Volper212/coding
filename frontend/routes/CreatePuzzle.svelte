<script lang="ts">
    import api from "frontend/api";
    import { PuzzleType } from "../../shared/types";
    async function create() {
        switch (type) {
            case PuzzleType.FindBug:
                api.createPuzzle.query({
                    syntaxRating,
                    algorithmRating,
                    analiseRating,
                    title,
                    type,
                    description,
                    code,
                    bugLine: line,
                });
                break;
            case PuzzleType.WriteProgram:
                api.createPuzzle.query({
                    syntaxRating,
                    algorithmRating,
                    analiseRating,
                    title,
                    type,
                    description /*inputs outputs*/,
                });
                break;
            case PuzzleType.FillGap:
                let word = code.split("\n")[line].slice(start, end);
                console.log(word);
                api.createPuzzle.query({
                    syntaxRating,
                    algorithmRating,
                    analiseRating,
                    description,
                    title,
                    type,
                    code,
                    line,
                    start,
                    end,
                    word,
                });
                break;
            case PuzzleType.WhatResult:
                api.createPuzzle.query({
                    syntaxRating,
                    algorithmRating,
                    analiseRating,
                    title,
                    type,
                    code,
                    result,
                });
                break;
        }
        location.replace("/");
    }
    let type: PuzzleType;
    let description = "";
    let code = "";
    let line = 0;
    let start = 0;
    let end = 0;
    let result = "";

    let syntaxRating = false;
    let algorithmRating = false;
    let analiseRating = false;

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
    {/if}
    {#if type == PuzzleType.FindBug || type == PuzzleType.FillGap || type == PuzzleType.WhatResult}
        <label>Kod<textarea bind:value={code} /></label>
    {/if}
    {#if type == PuzzleType.FindBug || type == PuzzleType.WriteProgram || type == PuzzleType.FillGap}
        <label>Opis<textarea bind:value={description} /></label>
    {/if}
    {#if type == PuzzleType.FillGap}
        <label>Numer linii<input type="number" bind:value={line} /></label>
        <label>Od znaku<input type="number" bind:value={start} /></label>
        <label>Do znaku<input type="number" bind:value={end} /></label>
    {/if}
    {#if type == PuzzleType.WhatResult}
        <label>Wynik<input bind:value={result} /></label>
    {/if}
    <br />
    <label>Składnia JS<input type="checkbox" bind:checked={syntaxRating} /></label>
    <label>Algorytmy<input type="checkbox" bind:checked={algorithmRating} /></label>
    <label>Analiza Kodu<input type="checkbox" bind:checked={analiseRating} /></label>
    <!-- <input type="text" required bind:value={username} /> -->

    <button type="submit">Wyslij</button>
</form>
