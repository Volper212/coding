<script lang="ts">
    import { Route, link } from "svelte-routing";
    import Test from "./routes/Test.svelte";
</script>

<Route path="/">
    <a href="/test" use:link>Test</a>
</Route>
<Route path="/test">
    <Test />
</Route>
