<script type="ts">
    export let puzzleType: number
</script>

<div id="switch">
    <div on:click={() => puzzleType = 0}>{"<Znajdź_błąd />"}</div>
    <div on:click={() => puzzleType = 1}>{"<Napisz_program />"}</div>
    <div on:click={() => puzzleType = 2}>{"<Uzupełnij_lukę />"}</div>
    <div on:click={() => puzzleType = 3}>{"<Co_się_wyświetli />"}</div>
</div>