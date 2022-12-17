<script type="ts">
    export let syntaxRating: boolean,
        algorithmRating: boolean,
        analiseRating: boolean;
</script>

<main>
    <span>Kategorie:</span>
    <span><input type="checkbox" bind:checked={syntaxRating} />Składnia JS</span>
    <span><input type="checkbox" bind:checked={algorithmRating} />Algorytmy</span>
    <span><input type="checkbox" bind:checked={analiseRating} />Analiza kodu</span>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
    }
</style>