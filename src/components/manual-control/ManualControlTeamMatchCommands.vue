<template>
    <div class="container">
        <div v-help-text="'Perform free kick (' + Object.keys(keymapDirect)[0] + ')'">
            <b-button v-hotkey="keymapDirect"
                      ref="btnDirect"
                      class="manual-control-button"
                      v-on:click="sendDirect"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Freekick
            </b-button>
        </div>
        <div v-help-text="'Prepare for a kickoff (' + Object.keys(keymapKickoff)[0] + ')'">
            <b-button v-hotkey="keymapKickoff"
                      ref="btnKickoff"
                      class="manual-control-button"
                      v-on:click="sendKickoff"
                      v-bind:disabled="halted || running || preparing">
                Kickoff
            </b-button>
        </div>
        <div v-help-text="'Prepare for a penalty kick'">
            <b-button v-on:click="sendPenalty"
                      class="manual-control-button"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Penalty
            </b-button>
        </div>
    </div>
</template>

<script>
    import ControlTeamTimeout from "./ControlTeamTimeout";
    import {isNonPausedStage, TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";
    import {submitNewCommand} from "@/submit";

    export default {
        name: "ManualControlTeamMatchCommands",
        components: {ControlTeamTimeout},
        props: {
            teamColor: String
        },
        methods: {
            send: function (command) {
                submitNewCommand(command, this.teamColor);
            },
            sendKickoff() {
                if (!this.$refs.btnKickoff.disabled) {
                    this.send('KICKOFF')
                }
            },
            sendDirect() {
                if (!this.$refs.btnDirect.disabled) {
                    this.send('DIRECT')
                }
            },
            sendPenalty() {
                this.send('PENALTY')
            },
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            keymapKickoff() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 1': this.sendKickoff};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 3': this.sendKickoff};
                }
            },
            keymapDirect() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 7': this.sendDirect};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 9': this.sendDirect};
                }
            },
            state() {
                return this.$store.state.matchState
            },
            halted() {
                return this.state.command.type === 'HALT';
            },
            running() {
                return this.state.command.type === 'FORCE_START'
                    || this.state.command.type === 'NORMAL_START'
                    || this.state.command.type === 'DIRECT';
            },
            preparing() {
                return this.state.command.type === 'KICKOFF' || this.state.command.type === 'PENALTY';
            },
            nonPausedStage() {
                return isNonPausedStage(this.state);
            },
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: 0;
        padding-right: 0;
    }
</style>
