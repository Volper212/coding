<script lang="ts">
    import Authentication from "./authentication/Authentication.svelte";
    import Home from "./Home.svelte";

    export let user: string | undefined;

    function setUser(newUser: string) {
        user = newUser;
    }

    function unsetUser() {
        user = undefined;
    }
</script>

{#if user}
    <Home {user} {unsetUser} />
{:else}
    <Authentication {setUser} />
{/if}
