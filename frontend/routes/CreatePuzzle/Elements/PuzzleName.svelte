<script type="ts">
    export let title: string
</script>

<div>
    Nazwa zadania:
    <input bind:value={title} />
</div>

<style lang="scss">
    div {
        width: 30vw;
        display: flex;
        flex-direction: column;
        input {
            width: 100%;
        }
    }
</style>