<script lang="ts">
    import { link } from "svelte-routing";
    import api from "./api";

    export let user: string;
    export let unsetUser: () => void;

    async function logOut() {
        await api.authentication.logOut.mutate();
        unsetUser();
    }
</script>

<h1>Witaj {user}!</h1>
<a href="/" use:link>Strona główna</a>
<a href="/" use:link on:click={logOut}>Wyloguj</a>
