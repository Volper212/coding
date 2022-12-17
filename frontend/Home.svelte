<script lang="ts">
    import { setContext } from "svelte";
    import Header from "./Header.svelte";
    import Navigation from "./Navigation.svelte";

    export let user: string;
    export let unsetUser: () => void;

    setContext("user", user);
</script>

<Header {unsetUser} />
<Navigation />