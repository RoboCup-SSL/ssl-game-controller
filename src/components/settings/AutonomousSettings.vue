<template>
    <div>
        <b-btn @click="showBehaviors=!showBehaviors" v-if="!showBehaviors">Configure Behaviors</b-btn>

        <EventBehavior v-if="showBehaviors"/>
    </div>
</template>

<script>
    import EventBehavior from "../events/EventBehavior";

    export default {
        name: "AutonomousSettings",
        components: {EventBehavior},
        data() {
            return {
                showBehaviors: false
            }
        },
    }
</script>

<style scoped>
</style>
