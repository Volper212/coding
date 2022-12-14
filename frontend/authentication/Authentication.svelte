<script lang="ts">
    import { Route } from "svelte-routing";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";

    export let setUser: (newUser: string) => void;
</script>

<Route>
    <Login {setUser} />
</Route>
<Route path="/register">
    <Register {setUser} />
</Route>
