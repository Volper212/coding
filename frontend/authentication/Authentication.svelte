<script lang="ts">
    import { Route } from "svelte-routing";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
</script>

<Route path="/">
    <Login />
</Route>
<Route path="/register">
    <Register />
</Route>
