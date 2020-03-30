<template>
    <div class="game-controller-container">
        <div class="auto-refs-connected" v-b-tooltip.hover.d500>
            <p>
                <b>{{autoRefsConnected}}</b> autoRefs connected: {{autoRefs}}
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
            gcState() {
                return this.$store.state.gcState
            },
            autoRefs() {
                if (this.autoRefsConnected) {
                    let autoRefs = '';
                    let autoRefNames = Object.keys(this.gcState.autoRefState);
                    for (let i = 0; i < autoRefNames.length; i++) {
                        autoRefs += autoRefNames[i];
                        if (i !== (autoRefNames.length - 1)) {
                            autoRefs += ', '
                        }
                    }
                    return autoRefs;
                }
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
