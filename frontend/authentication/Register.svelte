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
    <input type="text" bind:value={username} required autocomplete="username" />
    <input type="email" bind:value={email} required />
    <input type="password" bind:value={password} autocomplete="new-password" />
    <input type="password" bind:value={repeatedPassword} autocomplete="new-password" />
    <button type="submit">Zarejestruj</button>
</form>
