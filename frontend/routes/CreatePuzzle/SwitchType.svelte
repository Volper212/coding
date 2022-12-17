<script type="ts">
    export let puzzleType: number
</script>

<div id="switch">
    <div on:click={() => puzzleType = 0} style={puzzleType == 0 ? "color: #00FF38" : ""}>{"<Znajdź_błąd />"}</div>
    <div on:click={() => puzzleType = 1} style={puzzleType == 1 ? "color: #00FF38" : ""}>{"<Napisz_program />"}</div>
    <div on:click={() => puzzleType = 2} style={puzzleType == 2 ? "color: #00FF38" : ""}>{"<Uzupełnij_lukę />"}</div>
    <div on:click={() => puzzleType = 3} style={puzzleType == 3 ? "color: #00FF38" : ""}>{"<Co_się_wyświetli />"}</div>
</div>

<style lang="scss">
    @use "frontend/variables.scss" as *;

    #switch {
        font-size: 1.2vw;
        width: 60vw;
        display: flex;
        justify-content: space-between;
        padding-bottom: 1vw;
        border-bottom: 1px solid $primary-color;

        div {
            cursor: pointer;
        &:hover {
            color: rgba($button-color, 0.8);
        }
        }
    }
</style>