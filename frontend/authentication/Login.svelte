<script lang="ts">
    import api from "frontend/api";
    import { link } from "svelte-routing";

    export let setUser: (newUser: string) => void;

    let username = "";
    let password = "";

    async function logIn() {
        const message = await api.authentication.logIn.mutate({ username, password });
        if (message) {
            alert(message);
            return;
        }
        setUser(username);
    }
</script>

<form on:submit|preventDefault={logIn}>
    <input type="text" bind:value={username} required autocomplete="username" />
    <input type="password" bind:value={password} autocomplete="current-password" />
    <button type="submit">Zaloguj</button>
</form>
<a href="/register" use:link>Utwórz konto</a>
