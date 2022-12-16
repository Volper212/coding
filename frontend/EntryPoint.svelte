<script lang="ts">
    import api from "./api";
    import { Router } from "svelte-routing";
    import App from "./App.svelte";
</script>

<Router>
    {#await api.authentication.loggedInUser.query() then user}
        <App {user} />
    {/await}
</Router>

<style lang="scss">
    @use "global";
</style>
