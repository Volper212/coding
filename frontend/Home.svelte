<script lang="ts">
    import Header from "./Header.svelte";
    import Navigation from "./Navigation.svelte";

    export let user: string;
    export let unsetUser: () => void;
</script>

<Header {user} {unsetUser} />
<Navigation />
