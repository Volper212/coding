<script lang="ts">
    import { Route } from "svelte-routing";

    import Profile from "./routes/Profile.svelte";
    import Example from "./routes/Example.svelte";
    import Puzzle from "./routes/Puzzle.svelte";
    import CreatePuzzle from "./routes/CreatePuzzle.svelte";
</script>

<Route>
    <Profile />
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