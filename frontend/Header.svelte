<script lang="ts">
    import { link } from "svelte-routing";
    import api from "./api";

    export let user: string;
    export let unsetUser: () => void;

    async function logout() {
        await api.authentication.logout.mutate();
        unsetUser();
    }
</script>

<h1>Witaj {user}!</h1>
<a href="/" use:link on:click={logout}>Wyloguj</a>
