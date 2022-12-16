<script lang="ts">
    import { Route, link } from "svelte-routing";
    import Example from "./routes/Example.svelte";
    import Puzzle from "./routes/Puzzle.svelte";
    import CreatePuzzle from "./routes/CreatePuzzle.svelte";
</script>

<Route>
    <a href="/puzzle" use:link>Rozpocznij zadanie</a>
    <a href="/createPuzzle" use:link>Stwórz Zadanie</a>
</Route>
<Route path="/createPuzzle">
    <CreatePuzzle />
</Route>
<Route path="/example">
    <Example />
</Route>
<Route path="/puzzle">
    <Puzzle />
</Route>
