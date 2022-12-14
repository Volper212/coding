<script lang="ts">
    import { Route, link } from "svelte-routing";
    import Example from "./routes/Example.svelte";
</script>

<Route path="/">
    <a href="/example" use:link>Przykład</a>
</Route>
<Route path="/example">
    <Example />
</Route>
