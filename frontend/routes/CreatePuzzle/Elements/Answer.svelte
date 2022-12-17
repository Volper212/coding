<script type="ts">
    export let line: number;
    export let label: string;
    export let start = 0;
    export let end = 0;
    export let fill = false;
</script>

{label}<input type="number" bind:value={line} />

{#if fill == true}
    Od znaku<input type="number" bind:value={start} />
    Do znaku<input type="number" bind:value={end} />
{/if}
<!-- Wynik<input bind:value={result} /> -->

Answer
