<script lang="ts">
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";

    export let setUser: (newUser: string) => void;
</script>
<main>
    <header>
        <span class="name">Script<span class="on">on</span></span><br>
        <span class="code">console.log(<span class="color">“Logowanie do aplikacji”</span>);</span>
    </header>
    <div class="forms">
        <Login {setUser} />
        <Register {setUser} />
    </div>
</main>

<style lang="scss">
    @use "../variables.scss" as *;

    .forms {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .name {
            margin-bottom: 40px;
            font-size: 4vw;
        }

        header {
            margin-bottom: 4vw;
            font-size: 1.5vw;
            text-align: center;
            .code {
                display: block;
                margin-top: 2vw;
                color: $primary-color;
                .color {
                    color: $secondary-color;
                }
            }
        }
    }

    .on {
        color: $red-color;
    }
</style>