<template>
    <div class="game-controller-container">
        <table>
            <tr>
                <td align="left"><b>All</b></td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('on')}"
                               @click="changeAllBehaviorsTo('on')">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('majority')}"
                               @click="changeAllBehaviorsTo('majority')">
                            Majority
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('off')}"
                               @click="changeAllBehaviorsTo('off')">
                            Off
                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr v-for="eventType in eventTypes" :key="eventType">
                <td align="left">{{eventType}}</td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'on'}"
                               @click="changeBehavior(eventType, 'on')">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'majority'}"
                               @click="changeBehavior(eventType, 'majority')">
                            Majority
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'off'}"
                               @click="changeBehavior(eventType, 'off')">
                            Off
                        </label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "EventBehavior",
        computed: {
            gcState() {
                return this.$store.state.gcState
            },
            eventTypes() {
                return Object.keys(this.gcState.gameEventBehavior).sort();
            },
        },
        methods: {
            eventBehavior(eventType) {
                return this.gcState.gameEventBehavior[eventType];
            },
            changeBehavior(eventType, eventBehavior) {
                this.$socket.sendObj({
                    'modify': {'gameEventBehavior': {gameEventType: eventType, gameEventBehavior: eventBehavior}}
                })
            },
            allBehaviorsAre(value) {
                for (let behavior in Object.values(this.gcState.gameEventBehavior)) {
                    if (behavior !== value) {
                        return false;
                    }
                }
                return true;
            },
            changeAllBehaviorsTo(eventBehavior) {
                this.changeBehavior('all', eventBehavior);
            }
        }
    }
</script>

<style scoped>
</style>
