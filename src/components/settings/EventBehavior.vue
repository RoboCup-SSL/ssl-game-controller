<template>
    <div class="game-controller-container">
        <p>
            Game events can be handled in the following ways:
        </p>
        <ul class="legend">
            <li>Accept: Apply event immediately.</li>
            <li>Majority: Add event to proposals and accept it when majority reported same event.</li>
            <li>Propose only: Add event to proposals, but only accept it manually through UI.</li>
            <li>Log: Add passive event to the protocol, but do not process it at all.</li>
            <li>Ignore: Drop event silently.</li>
        </ul>
        <table>
            <tr>
                <td><strong>All</strong></td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label v-for="(behaviorName, behavior) in behaviors"
                               :class="{btn:true, 'btn-secondary': true, active: allBehaviorsAre(behavior)}"
                               :key="behavior"
                               @click="changeAllBehaviorsTo(behavior)">
                            {{behaviorName}}
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
                <td>{{eventType}}</td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label v-for="(behaviorName, behavior) in behaviors"
                               :class="{btn:true, 'btn-secondary': true, active: eventBehavior(eventType) === behavior}"
                               :key="behavior"
                               @click="changeBehavior(eventType, behavior)">
                            {{behaviorName}}
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
            gameEventBehavior() {
                return this.$store.state.config.gameEventBehavior;
            },
            eventTypes() {
                return Object.keys(this.gameEventBehavior).sort();
            },
            behaviors() {
                return {
                    "BEHAVIOR_ACCEPT": "Accept",
                    "BEHAVIOR_ACCEPT_MAJORITY": "Majority",
                    "BEHAVIOR_PROPOSE_ONLY": "Propose",
                    "BEHAVIOR_LOG": "Log",
                    "BEHAVIOR_IGNORE": "Ignore"
                }
            },
        },
        methods: {
            eventBehavior(eventType) {
                return this.gameEventBehavior[eventType];
            },
            changeBehavior(eventType, value) {
                submitConfigUpdate({
                    gameEventBehavior: {
                        [eventType]: value
                    }
                });
            },
            allBehaviorsAre(value) {
                for (let behavior of Object.values(this.gameEventBehavior)) {
                    if (behavior !== value) {
                        return false;
                    }
                }
                return true;
            },
            changeAllBehaviorsTo(value) {
                let behaviorMap = {};
                for (let key of Object.keys(this.gameEventBehavior)) {
                    behaviorMap[key] = value;
                }

                submitConfigUpdate({
                    gameEventBehavior: behaviorMap
                });
            }
        }
    }
</script>

<style scoped>
    .game-controller-container {
        text-align: left;
    }
</style>
