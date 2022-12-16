<script lang="ts">
    import { link } from "svelte-routing";
    import api from "./api";

    export let unsetUser: () => void;

    async function logOut() {
        await api.authentication.logOut.mutate();
        unsetUser();
    }
</script>

<a href="/" use:link>Strona główna</a>
<a href="/" use:link on:click={logOut}>Wyloguj</a>
