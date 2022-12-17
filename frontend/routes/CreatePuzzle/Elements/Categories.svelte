<script type="ts">
    export let syntaxRating: boolean,
        algorithmRating: boolean,
        analyseRating: boolean;
</script>

<main>
    <span>Kategorie:</span>
    <label><input type="checkbox" bind:checked={syntaxRating} />Składnia JS</label>
    <label><input type="checkbox" bind:checked={algorithmRating} />Algorytmy</label>
    <label><input type="checkbox" bind:checked={analyseRating} />Analiza kodu</label>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
    }

    label {
        cursor: pointer;
    }
</style>