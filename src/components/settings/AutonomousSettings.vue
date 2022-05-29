<template>
    <div class="game-controller-container">
        <div class="auto-refs-connected">
            <p>
                <strong>{{autoRefsConnected}}</strong> autoRefs connected: {{autoRefs}}
            </p>
        </div>

        <b-tabs content-class="mt-3">
            <b-tab title="Game events" active>
                <EventBehavior/>
            </b-tab>
            <b-tab v-for="autoRef in autoRefs" :title="autoRef" :key="autoRef">
                <AutoRefConfig :auto-ref-name="autoRef"/>
            </b-tab>
            <b-tab title="Tracker sources">
                <TrackerConfig/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import EventBehavior from "./EventBehavior";
    import AutoRefConfig from "./AutoRefConfig";
    import TrackerConfig from "./TrackerConfig";

    export default {
        name: "AutonomousSettings",
        components: {TrackerConfig, AutoRefConfig, EventBehavior},
        computed: {
            gcState() {
                return this.$store.state.gcState
            },
            autoRefs() {
                return Object.keys(this.gcState.autoRefState);
            },
            autoRefsConnected() {
                if (this.gcState.autoRefState) {
                    return Object.keys(this.gcState.autoRefState).length;
                }
                return 0;
            },
        }
    }
</script>

<style scoped>
</style>
