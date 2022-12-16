<script lang="ts">
    import api from "frontend/api";

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

<form on:submit|preventDefault={logIn} style="height: 25vw;">
    <h1>Logowanie</h1>
    <label>Login:<br><input type="text" bind:value={username} required autocomplete="username" /></label>
    <label>Hasło:<br><input type="password" bind:value={password} autocomplete="current-password" /></label>
    <button type="submit">Zaloguj</button>
</form>

<style lang="scss">
    @use "./forms.scss";
</style>
