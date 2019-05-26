<template>
    <div>
        <div class="auto-refs-connected" v-b-tooltip.hover :title="autoRefs">
            <p>
                <b>{{autoRefsConnected}}</b> autoRefs connected.
            </p>
        </div>

        <b-btn @click="showBehaviors=!showBehaviors" v-if="!showBehaviors">Configure Behaviors</b-btn>

        <EventBehavior v-if="showBehaviors"/>
    </div>
</template>

<script>
    import EventBehavior from "./EventBehavior";

    export default {
        name: "AutonomousSettings",
        components: {EventBehavior},
        data() {
            return {
                showBehaviors: false
            }
        },
        computed: {
            engineState() {
                return this.$store.state.engineState
            },
            autoRefs() {
                if (this.autoRefsConnected) {
                    let autoRefs = 'Connected AutoRefs: ';
                    for (let i = 0; i < this.engineState.autoRefsConnected.length; i++) {
                        autoRefs += this.engineState.autoRefsConnected[i];
                        if (i !== (this.engineState.autoRefsConnected.length - 1)) {
                            autoRefs += ', '
                        }
                    }
                    return autoRefs;
                }
            },
            autoRefsConnected() {
                if (this.engineState.autoRefsConnected != null) {
                    return this.engineState.autoRefsConnected.length;
                }
                return 0;
            },
        }
    }
</script>

<style scoped>
</style>
