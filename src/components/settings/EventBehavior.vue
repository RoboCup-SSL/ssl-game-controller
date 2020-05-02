<template>
    <div class="game-controller-container">
        <table>
            <tr>
                <td align="left"><b>All</b></td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('GAME_EVENT_BEHAVIOR_ON')}"
                               @click="changeAllBehaviorsTo('GAME_EVENT_BEHAVIOR_ON')">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('GAME_EVENT_BEHAVIOR_MAJORITY')}"
                               @click="changeAllBehaviorsTo('GAME_EVENT_BEHAVIOR_MAJORITY')">
                            Majority
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre('GAME_EVENT_BEHAVIOR_OFF')}"
                               @click="changeAllBehaviorsTo('GAME_EVENT_BEHAVIOR_OFF')">
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
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'GAME_EVENT_BEHAVIOR_ON'}"
                               @click="changeBehavior(eventType, 'GAME_EVENT_BEHAVIOR_ON')">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'GAME_EVENT_BEHAVIOR_MAJORITY'}"
                               @click="changeBehavior(eventType, 'GAME_EVENT_BEHAVIOR_MAJORITY')">
                            Majority
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === 'GAME_EVENT_BEHAVIOR_OFF'}"
                               @click="changeBehavior(eventType, 'GAME_EVENT_BEHAVIOR_OFF')">
                            Off
                        </label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {submitConfigUpdate} from "../../submit";

    export default {
        name: "EventBehavior",
        computed: {
            eventTypes() {
                return Object.keys(this.$store.state.config.gameEventBehavior).sort();
            },
        },
        methods: {
            eventBehavior(eventType) {
                return this.$store.state.config.gameEventBehavior[eventType];
            },
            changeBehavior(eventType, eventBehavior) {
                submitConfigUpdate({
                    gameEventBehavior: {
                        [eventType]: eventBehavior
                    }
                });
            },
            allBehaviorsAre(value) {
                for (let behavior of Object.values(this.$store.state.config.gameEventBehavior)) {
                    if (behavior !== value) {
                        return false;
                    }
                }
                return true;
            },
            changeAllBehaviorsTo(eventBehavior) {
                let behaviorMap = {};
                for (let key of Object.keys(this.$store.state.config.gameEventBehavior)) {
                    behaviorMap[key] = eventBehavior;
                }

                submitConfigUpdate({
                    gameEventBehavior: behaviorMap
                });
            }
        }
    }
</script>

<style scoped>
</style>
