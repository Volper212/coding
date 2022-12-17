<script lang="ts">
    import { link } from "svelte-routing";
    import api from "./api";

    export let unsetUser: () => void;

    async function logOut() {
        await api.authentication.logOut.mutate();
        unsetUser();
    }

    let username = "";
    let email = "";
    async function getEmailAndUsername() {
        [username, email] = await api.getLoginEmail.query();
    }
    getEmailAndUsername();
</script>

<main>
    <div>
        <a href="/" class="name" use:link><span>Script<span class="on">on</span></span></a>
        <span class="code" style="font-size: 1.5vw;"
            >console.log(<span class="color">“Profil”</span>);</span
        >
    </div>

    <div>
        <div class="data">
            <span class="code"
                >let <span class="color">twoj_login</span> =
                <span class="color">{username}</span>;</span
            ><br />
            <span class="code"
                >let <span class="color">twoj_email</span> =
                <span class="color">{email}</span>;</span
            ><br />
        </div>
        <a href="/" use:link on:click={logOut}><button class="logout">Wyloguj się</button></a>
    </div>
</main>

<style lang="scss">
    @use "./variables.scss" as *;

    main {
        height: 20vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 2vw;

        div {
            width: 35%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    .name {
        color: white;
        text-decoration: none;
        font-size: 3vw;
        .on {
            color: $red-color;
        }
    }

    .name:hover {
        color: $red-color;
        .on {
            color: white;
        }
    }

    .code {
        text-align: left;
        font-size: 1.1vw;
        color: $primary-color;
        .color {
            color: $secondary-color;
        }
    }

    .data .code {
        font-size: 0.9vw;
    }

    .logout {
        color: $red-color;
    }
</style>
