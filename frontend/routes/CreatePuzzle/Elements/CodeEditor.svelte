<script type="ts">
    export let code: string
</script>

<div>
    <span>Kod:</span>
    <textarea bind:value={code} />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        textarea {
            height: 20vw;
        }
    }
</style>