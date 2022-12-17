<script type="ts">
    export let line: number;
    export let label: string;
    export let start = 0;
    export let end = 0;
</script>

{label}<input type="number" bind:value={line} />

Od znaku<input type="number" bind:value={start} />
Do znaku<input type="number" bind:value={end} />

<!-- Wynik<input bind:value={result} /> -->

Answer
