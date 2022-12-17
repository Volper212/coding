<script type="ts">
    export let syntaxRating: boolean,
        algorithmRating: boolean,
        analyseRating: boolean;
</script>

<main>
    <span>Kategorie:</span>
    <span><input type="checkbox" bind:checked={syntaxRating} />Składnia JS</span>
    <span><input type="checkbox" bind:checked={algorithmRating} />Algorytmy</span>
    <span><input type="checkbox" bind:checked={analyseRating} />Analiza kodu</span>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
    }
</style>