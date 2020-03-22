<template>
    <div class="container">
        <div v-b-tooltip.hover
             :title="'Perform direct kick (corner and goal kicks) (' + Object.keys(keymapDirect)[0] + ')'">
            <b-button v-hotkey="keymapDirect"
                      ref="btnDirect"
                      class="manual-control-button"
                      v-on:click="sendDirect"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Direct
            </b-button>
        </div>
        <div v-b-tooltip.hover
             :title="'Perform indirect kick (throw-in) (' + Object.keys(keymapIndirect)[0] + ')'">
            <b-button v-hotkey="keymapIndirect"
                      ref="btnIndirect"
                      class="manual-control-button"
                      v-on:click="sendIndirect"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Indirect
            </b-button>
        </div>
        <div v-b-tooltip.hover
             :title="'Prepare for a kickoff (' + Object.keys(keymapKickoff)[0] + ')'">
            <b-button v-hotkey="keymapKickoff"
                      ref="btnKickoff"
                      class="manual-control-button"
                      v-on:click="sendKickoff"
                      v-bind:disabled="halted || running || preparing">
                Kickoff
            </b-button>
        </div>
        <div v-b-tooltip.hover
             title="Prepare for a penalty kick">
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
    import {isNonPausedStage, TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "ManualControlTeamMatchCommands",
        components: {ControlTeamTimeout},
        props: {
            teamColor: Number
        },
        methods: {
            send: function (command) {
                this.$socket.sendObj({
                    'command': {'forTeam': this.teamColor, 'commandType': command}
                })
            },
            sendKickoff() {
                if (!this.$refs.btnKickoff.disabled) {
                    this.send('kickoff')
                }
            },
            sendDirect() {
                if (!this.$refs.btnDirect.disabled) {
                    this.send('direct')
                }
            },
            sendIndirect() {
                if (!this.$refs.btnIndirect.disabled) {
                    this.send('indirect')
                }
            },
            sendPenalty() {
                this.send('penalty')
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
            keymapIndirect() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 4': this.sendIndirect};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 6': this.sendIndirect};
                }
            },
            state() {
                return this.$store.state.matchState
            },
            halted() {
                return this.state.command === 'halt';
            },
            running() {
                return this.state.command === 'forceStart'
                    || this.state.command === 'normalStart'
                    || this.state.command === 'direct'
                    || this.state.command === 'indirect';
            },
            preparing() {
                return this.state.command === 'kickoff' || this.state.command === 'penalty';
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
