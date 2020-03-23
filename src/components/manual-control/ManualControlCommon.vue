<template>
    <table>
        <tr>
            <td>
                <div v-b-tooltip.hover
                     :title="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
                    <b-button v-hotkey="keymapHalt"
                              ref="btnHalt"
                              class="manual-control-button"
                              v-on:click="send('halt')"
                              v-bind:disabled="halted">
                        Halt
                    </b-button>
                </div>
            </td>
            <td>
                <div v-b-tooltip.hover
                     :title="'Robots have to keep distance to the ball (' + Object.keys(keymapStop)[0] + ')'">
                    <b-button v-hotkey="keymapStop"
                              ref="btnStop"
                              class="manual-control-button"
                              v-on:click="send('stop')"
                              v-bind:disabled="stopped || !stopAllowed">
                        Stop
                    </b-button>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div v-b-tooltip.hover
                     :title="'Restart the game in draw situations (' + Object.keys(keymapForceStart)[0] + ')'">
                    <b-button v-hotkey="keymapForceStart"
                              ref="btnForceStart"
                              class="manual-control-button"
                              v-on:click="send('forceStart')"
                              v-bind:disabled="!stopped || !forceStartAllowed">
                        Force Start
                    </b-button>
                </div>
            </td>
            <td>
                <div v-b-tooltip.hover
                     :title="'Continue game after a prepare state (' + Object.keys(keymapNormalStart)[0] + ')'">
                    <b-button v-hotkey="keymapNormalStart"
                              ref="btnNormalStart"
                              class="manual-control-button"
                              v-on:click="send('normalStart')"
                              v-bind:disabled="!prepareSth || !normalStartAllowed">
                        Normal Start
                    </b-button>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
    import {isNonPausedStage, isPreStage, TEAM_UNKNOWN} from "../../refereeState";
    import {submitNewCommand} from "../../main";

    export default {
        name: "ManualControlCommon",
        methods: {
            send: function (command) {
                submitNewCommand(command, TEAM_UNKNOWN);
            },
        },
        computed: {
            keymapHalt() {
                return {
                    'esc': () => {
                        if (!this.$refs.btnHalt.disabled) {
                            submitNewCommand('halt', TEAM_UNKNOWN);
                        }
                    }
                }
            },
            keymapStop() {
                return {
                    'ctrl+alt+numpad 0': () => {
                        if (!this.$refs.btnStop.disabled) {
                            submitNewCommand('stop', TEAM_UNKNOWN);
                        }
                    }
                }
            },
            keymapForceStart() {
                return {
                    'ctrl+alt+numpad 5': () => {
                        if (!this.$refs.btnForceStart.disabled) {
                            submitNewCommand('forceStart', TEAM_UNKNOWN);
                        }
                    }
                }
            },
            keymapNormalStart() {
                return {
                    'ctrl+alt+numpad 8': () => {
                        if (!this.$refs.btnNormalStart.disabled) {
                            submitNewCommand('normalStart', TEAM_UNKNOWN);
                        }
                    }
                }
            },
            state() {
                return this.$store.state.matchState
            },
            halted() {
                return this.state.command === 'halt';
            },
            stopped() {
                return this.state.command === 'stop';
            },
            prepareSth() {
                return this.state.command === 'kickoff' || this.state.command === 'penalty';
            },
            forceStartAllowed() {
                return isNonPausedStage(this.state);
            },
            normalStartAllowed() {
                return isNonPausedStage(this.state) || this.state.command === 'kickoff';
            },
            stopAllowed() {
                return isNonPausedStage(this.$store.state.matchState)
                    || isPreStage(this.$store.state.matchState);
            },
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
    }
</style>
