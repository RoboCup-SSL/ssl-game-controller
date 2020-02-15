<template>
    <div class="container">
        <RemoteControlButtonPane/>
    </div>
</template>

<script>
    import RemoteControlButtonPane from "./remote/RemoteControlButtonPane";

    export default {
        name: "TeamRemoteControl",
        components: {RemoteControlButtonPane}
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        max-width: 100%;
    }
</style>