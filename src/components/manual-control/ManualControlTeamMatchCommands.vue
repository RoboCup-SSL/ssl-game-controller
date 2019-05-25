<template>
    <div class="container">
        <div v-b-tooltip.hover
             :title="'Perform direct kick (corner and goal kicks) (' + Object.keys(keymapDirect)[0] + ')'">
            <b-button v-hotkey="keymapDirect"
                      ref="btnDirect"
                      v-on:click="sendDirect"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Direct
            </b-button>
        </div>
        <div v-b-tooltip.hover
             :title="'Perform indirect kick (throw-in) (' + Object.keys(keymapIndirect)[0] + ')'">
            <b-button v-hotkey="keymapIndirect"
                      ref="btnIndirect"
                      v-on:click="sendIndirect"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Indirect
            </b-button>
        </div>
        <div v-b-tooltip.hover
             :title="'Prepare for a kickoff (' + Object.keys(keymapKickoff)[0] + ')'">
            <b-button v-hotkey="keymapKickoff"
                      ref="btnKickoff"
                      v-on:click="sendKickoff"
                      v-bind:disabled="halted || running || preparing">
                Kickoff
            </b-button>
        </div>
        <div v-b-tooltip.hover
             title="Prepare for a penalty kick">
            <b-button v-on:click="sendPenalty"
                      v-bind:disabled="halted || running || preparing || !nonPausedStage">
                Penalty
            </b-button>
        </div>
    </div>
</template>

<script>
    import ControlTeamTimeout from "./ControlTeamTimeout";
    import {isNonPausedStage} from "../../refereeState";

    export default {
        name: "ManualControlTeamMatchCommands",
        components: {ControlTeamTimeout},
        props: {
            teamColor: String
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
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            keymapKickoff() {
                if (this.teamColor.toString() === 'Yellow') {
                    return {'ctrl+alt+numpad 1': this.sendKickoff};
                } else if (this.teamColor.toString() === 'Blue') {
                    return {'ctrl+alt+numpad 3': this.sendKickoff};
                }
            },
            keymapDirect() {
                if (this.teamColor.toString() === 'Yellow') {
                    return {'ctrl+alt+numpad 7': this.sendDirect};
                } else if (this.teamColor.toString() === 'Blue') {
                    return {'ctrl+alt+numpad 9': this.sendDirect};
                }
            },
            keymapIndirect() {
                if (this.teamColor.toString() === 'Yellow') {
                    return {'ctrl+alt+numpad 4': this.sendIndirect};
                } else if (this.teamColor.toString() === 'Blue') {
                    return {'ctrl+alt+numpad 6': this.sendIndirect};
                }
            },
            state() {
                return this.$store.state.refBoxState
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

    button {
        margin: 0.5em;
        width: 90%;
    }
</style>
