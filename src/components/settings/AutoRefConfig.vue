<template>
    <div class="game-controller-container">
        <p>
            Game events from this autoRef can be handled in the following ways:
        </p>
        <ul class="legend">
            <li>Accept: Process event according to the globally configured behavior (first tab).</li>
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
        name: "AutoRefConfig",
        props: {
            autoRefName: String
        },
        computed: {
            gameEventBehavior() {
                if (this.$store.state.config.autoRefConfigs.hasOwnProperty(this.autoRefName)) {
                    return this.$store.state.config.autoRefConfigs[this.autoRefName].gameEventBehavior;
                }
                return [];
            },
            eventTypes() {
                return Object.keys(this.gameEventBehavior).sort();
            },
            behaviors() {
                return {
                    "BEHAVIOR_ACCEPT": "Accept",
                    "BEHAVIOR_LOG": "Log",
                    "BEHAVIOR_IGNORE": "Ignore"
                }
            },
        },
        methods: {
            eventBehavior(eventType) {
                return this.gameEventBehavior[eventType];
            },
            changeBehavior(event, value) {
                submitConfigUpdate({
                    autoRefConfigs: {
                        [this.autoRefName]: {
                            gameEventBehavior: {
                                [event]: value
                            }
                        }
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
                    autoRefConfigs: {
                        [this.autoRefName]: {
                            gameEventBehavior: behaviorMap
                        }
                    }
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
