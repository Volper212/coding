<script type="ts">
    import { PuzzleType } from "../../../shared/types";

    import CreatePuzzle from "../CreatePuzze";

    import PuzzleName from "./Elements/PuzzleName.svelte";
    import Description from "./Elements/Description.svelte";
    import Categories from "./Elements/Categories.svelte";

    let title = "",
        description = "",
        syntaxRating = false,
        algorithmRating = false,
        analiseRating = false;
</script>

<form on:submit|preventDefault={() => CreatePuzzle(PuzzleType.WriteProgram, title, description, syntaxRating, algorithmRating, analiseRating, "", 0, "", 0, 0)}>
    <main>
        <div><PuzzleName bind:title /></div>
        <div><Description bind:description /></div>
        <div><Categories bind:syntaxRating bind:algorithmRating bind:analiseRating /></div>
        <div><button type="submit">Wyślij</button></div>
    </main>
</form>

<style lang="scss">
    @use "./Type.scss" as *;
</style>
