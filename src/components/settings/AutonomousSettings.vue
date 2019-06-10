<template>
    <div class="game-controller-container">
        <div class="auto-refs-connected" v-b-tooltip.hover>
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
                    for (let i = 0; i < this.gcState.autoRefsConnected.length; i++) {
                        autoRefs += this.gcState.autoRefsConnected[i];
                        if (i !== (this.gcState.autoRefsConnected.length - 1)) {
                            autoRefs += ', '
                        }
                    }
                    return autoRefs;
                }
            },
            autoRefsConnected() {
                if (this.gcState.autoRefsConnected != null) {
                    return this.gcState.autoRefsConnected.length;
                }
                return 0;
            },
        }
    }
</script>

<style scoped>
</style>
