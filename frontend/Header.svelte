<script lang="ts">
    import { link } from "svelte-routing";
    import api from "./api";

    export let unsetUser: () => void;

    async function logOut() {
        await api.authentication.logOut.mutate();
        unsetUser();
    }
</script>

<!--<a href="/" use:link>Strona główna</a>-->

<main>
    <div>
        <span class="name">Script<span class="on">on</span></span>
        <span class="code" style="font-size: 1.5vw;">console.log(<span class="color">“Profil”</span>);</span>
    </div>

    <div>
        <div class="data">
            <span class="code">let <span class="color">twoj_login</span> = <span class="color">"Czaros"</span>;</span><br>
            <span class="code">let <span class="color">twoj_email</span> = <span class="color">"cezario@gmail.com"</span>;</span><br>
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
    }

    main > div {
        width: 35%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
}

    .name {
        font-size: 3vw;
        .on {
            color: $red-color;
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
