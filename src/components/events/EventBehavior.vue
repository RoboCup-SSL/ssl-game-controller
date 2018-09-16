<template>
    <div>
        <table>
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
            state() {
                return this.$store.state.refBoxState
            },
            eventTypes() {
                return Object.keys(this.state.gameEventBehavior).sort();
            },
        },
        methods: {
            eventBehavior(eventType) {
                return this.state.gameEventBehavior[eventType];
            },
            changeBehavior(eventType, eventBehavior) {
                this.$socket.sendObj({
                    'modify': {'gameEventBehavior': {gameEventType: eventType, gameEventBehavior: eventBehavior}}
                })
            }
        }
    }
</script>

<style scoped>

</style>