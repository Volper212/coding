<script lang="ts">
    import api from "frontend/api";
    import { link } from "svelte-routing";

    let username = "";
    let password = "";
    let repeatedPassword = "";

    async function register() {
        if (password !== repeatedPassword) {
            alert("Hasła nie są takie same");
            return;
        }
        const message = await api.authentication.register.mutate({ username, password });
        if (message) {
            alert(message);
            return;
        }
        location.reload();
    }
</script>

<form on:submit|preventDefault={register}>
    <input type="text" bind:value={username} required />
    <input type="password" bind:value={password} />
    <input type="password" bind:value={repeatedPassword} />
    <button type="submit">Zarejestruj</button>
</form>
<a href="/" use:link>Zaloguj się</a>
