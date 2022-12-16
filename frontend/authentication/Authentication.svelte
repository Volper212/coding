<script lang="ts">
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";

    export let setUser: (newUser: string) => void;
</script>

<Login {setUser} />
<Register {setUser} />
