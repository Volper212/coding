<script type="ts">
    export let description: string
</script>

<div>
    <span>Opis:</span>
    <textarea bind:value={description} />
</div>

<style lang="scss">
    div {
        width: 30vw;
        display: flex;
        flex-direction: column;
    }
</style>