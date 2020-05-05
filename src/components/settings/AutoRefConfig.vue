<template>
    <div class="game-controller-container">
        <table>
            <tr>
                <td align="left"><b>All</b></td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label :class="{btn:true, 'btn-secondary': true, active: allValuesAre(true)}"
                               @click="changeAllValuesTo(true)">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: allValuesAre(false)}"
                               @click="changeAllValuesTo(false)">
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
            <tr v-for="(eventState, event) in gameEventEnabled" :key="event">
                <td align="left">{{event}}</td>
                <td>
                    <div class="btn-group-toggle btn-group">
                        <label :class="{btn:true, 'btn-secondary': true, active: eventState}"
                               @click="changeEventState(event, true)">
                            On
                        </label>
                        <label :class="{btn:true, 'btn-secondary': true, active: !eventState}"
                               @click="changeEventState(event, false)">
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
        name: "AutoRefConfig",
        props: {
            autoRefName: String
        },
        computed: {
            gameEventEnabled() {
                if (this.$store.state.config.autoRefConfigs.hasOwnProperty(this.autoRefName)) {
                    return this.$store.state.config.autoRefConfigs[this.autoRefName].gameEventEnabled;
                }
                return [];
            },
            eventTypes() {
                return Object.keys(this.gameEventEnabled).sort();
            },
        },
        methods: {
            changeEventState(event, value) {
                submitConfigUpdate({
                    autoRefConfigs: {
                        [this.autoRefName]: {
                            gameEventEnabled: {
                                [event]: value
                            }
                        }
                    }
                });
            },
            allValuesAre(value) {
                for (let eventEnabled of Object.values(this.gameEventEnabled)) {
                    if (eventEnabled !== value) {
                        return false;
                    }
                }
                return true;
            },
            changeAllValuesTo(value) {
                let eventEnabled = {};
                for (let event of this.eventTypes) {
                    eventEnabled[event] = value;
                }

                submitConfigUpdate({
                    autoRefConfigs: {
                        [this.autoRefName]: {
                            gameEventEnabled: eventEnabled
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>
