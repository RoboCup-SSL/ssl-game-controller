<template>
    <div class="switch-window-bar">
        <b-button @click="$router.push('/')">Main</b-button>
        <b-button @click="$router.push('/field')">Field</b-button>
    </div>
</template>

<script>
    export default {
        name: "SwitchWindowBar"
    }
</script>

<style scoped>

    .switch-window-bar {
        position: fixed;
        bottom: 0;
        text-align: left;
        display: flex;
        justify-content: left;
    }

</style>
