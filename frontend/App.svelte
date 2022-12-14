<script lang="ts">
    import Authentication from "./authentication/Authentication.svelte";
    import Home from "./Home.svelte";
    import api from "./api";
    import { Router } from "svelte-routing";
</script>

<Router>
    {#await api.authentication.loggedInUser.query() then user}
        {#if user}
            <Home {user} />
        {:else}
            <Authentication />
        {/if}
    {/await}
</Router>
