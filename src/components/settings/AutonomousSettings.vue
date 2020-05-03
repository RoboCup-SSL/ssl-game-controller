<template>
    <div class="game-controller-container">
        <div class="auto-refs-connected" v-b-tooltip.hover.d500>
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
        </b-tabs>
    </div>
</template>

<script>
    import EventBehavior from "./EventBehavior";
    import AutoRefConfig from "./AutoRefConfig";

    export default {
        name: "AutonomousSettings",
        components: {AutoRefConfig, EventBehavior},
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
