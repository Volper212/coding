<script lang="ts">
    import api from "frontend/api";
    import { link } from "svelte-routing";

    let username = "";
    let password = "";

    async function login() {
        const message = await api.authentication.login.mutate({ username, password });
        if (message) {
            alert(message);
            return;
        }
        location.reload();
    }
</script>

<form on:submit|preventDefault={login}>
    <input type="text" bind:value={username} required autocomplete="username" />
    <input type="password" bind:value={password} autocomplete="current-password" />
    <button type="submit">Zaloguj</button>
</form>
<a href="/register" use:link>Utwórz konto</a>
