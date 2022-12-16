<script lang="ts">
    import { Route, link } from "svelte-routing";
    import Example from "./routes/Example.svelte";
    import CreatePuzzle from "./routes/CreatePuzzle.svelte";
</script>

<Route path="/">
    <a href="/example" use:link>Przykład</a>
    <a href="/createPuzzle" use:link>Stwórz Zadanie</a>
</Route>
<Route path="/createPuzzle">
    <CreatePuzzle />
</Route>
<Route path="/example">
    <Example />
</Route>
