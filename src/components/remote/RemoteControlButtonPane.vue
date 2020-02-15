<template>
    <div class="container">
        <b-button class="item item-timeout">
            Timeout
        </b-button>
        <b-button class="item item-emergency">
            Emergency stop
        </b-button>
        <b-button class="item item-substitution">
            Substitute robot
        </b-button>
        <b-button class="item item-challenge">
            Challenge referee
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "RemoteControlButtonPane"
    }
</script>

<style scoped>
    .container {
        display: grid;
        width: 100%;
        height: 100%;
        max-width: 100%;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
    }
    .item {
        font-size: 6vw;
    }
</style>