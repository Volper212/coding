<script lang="ts">
    import api from "frontend/api";

    export let setUser: (newUser: string) => void;

    let username = "";
    let email = "";
    let password = "";
    let repeatedPassword = "";

    async function register() {
        if (password !== repeatedPassword) {
            alert("Hasła nie są takie same");
            return;
        }
        const message = await api.authentication.register.mutate({ username, email, password });
        if (message) {
            alert(message);
            return;
        }
        setUser(username);
    }
</script>

<form on:submit|preventDefault={register}>
    <h1>Rejestracja</h1>
    <label>Login:<br><input type="text" bind:value={username} required autocomplete="username" /></label>
    <label>Adres email:<br><input type="email" bind:value={email} required /></label>
    <label>Hasło:<br><input type="password" bind:value={password} autocomplete="new-password" /></label>
    <label>Powtórz hasło:<br><input type="password" bind:value={repeatedPassword} autocomplete="new-password" /></label>
    <button type="submit">Zarejestruj</button>
</form>

<style lang="scss">
    @use "./forms.scss" as *;
</style>
