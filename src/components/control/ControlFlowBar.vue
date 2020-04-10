<template>
    <div class="control-flaw-bar">
        <div v-b-tooltip.hover.d500
             :title="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
            <b-button v-hotkey="keymapHalt"
                      ref="btnHalt"
                      v-on:click="send('HALT')"
                      v-bind:disabled="halted">
                Halt
            </b-button>
        </div>

        <div v-b-tooltip.hover.d500
             :title="'Continue based on last game event (' + Object.keys(keymapContinue)[0] + ')'">
            <b-button v-hotkey="keymapContinue"
                      ref="btnContinue"
                      v-on:click="triggerContinue"
                      v-bind:disabled="continueDisabled">
                Continue
                <span v-if="nextCommand && nextCommand.forTeam">with</span>
                <span v-if="nextCommand"
                      :class="teamColorClass">
                    {{nextCommand.type}}
                </span>
            </b-button>
        </div>

        <div v-for="autoRefId of autoRefs"
             v-bind:key="autoRefId"
             v-if="autoRefReady(autoRefId) !== undefined || autoRefBallPlaced(autoRefId) !== undefined"
             class="auto-ref-meta">
            {{autoRefId}}
            <font-awesome-icon
                    v-b-tooltip.hover.d500
                    title="Ready to continue"
                    v-if="autoRefReady(autoRefId)"
                    class="fa-xs"
                    icon="check-circle"/>
            <font-awesome-icon
                    v-b-tooltip.hover.d500
                    title="Not ready to continue yet"
                    v-else
                    class="fa-xs"
                    icon="times-circle"/>
        </div>
    </div>
</template>

<script>
    import {isNonPausedStage, isPreStage, TEAM_BLUE, TEAM_UNKNOWN, TEAM_YELLOW} from "../../refereeState";
    import {submitChange, submitNewCommand} from "../../submit";

    export default {
        name: "ControlFlowBar",
        methods: {
            send: function (command) {
                submitNewCommand(command, TEAM_UNKNOWN);
            },
            triggerContinue() {
                submitChange({continue: {}});
            },
            autoRefReady(id) {
                return this.$store.state.gcState.autoRefState[id].readyToContinue;
            }
        },
        computed: {
            keymapHalt() {
                return {
                    'esc': () => {
                        if (!this.$refs.btnHalt.disabled) {
                            this.send('HALT')
                        }
                    }
                }
            },
            keymapContinue() {
                return {
                    'ctrl+space': () => {
                        if (!this.$refs.btnContinue.disabled) {
                            this.triggerContinue()
                        }
                    }
                }
            },
            halted() {
                return this.$store.state.matchState.command.type === 'HALT';
            },
            continueDisabled() {
                return !this.nextCommand;
            },
            stopAllowed() {
                return isNonPausedStage(this.$store.state.matchState)
                    || isPreStage(this.$store.state.matchState);
            },
            nextCommand() {
                if (this.halted) {
                    if (this.stopAllowed) {
                        return {type: 'STOP'};
                    }
                    return null;
                }
                if (!this.$store.state.matchState.nextCommand) {
                    return null;
                }
                return this.$store.state.matchState.nextCommand;
            },
            teamColorClass() {
                return {
                    'team-blue': this.nextCommand && this.nextCommand.forTeam === TEAM_BLUE,
                    'team-yellow': this.nextCommand && this.nextCommand.forTeam === TEAM_YELLOW
                }
            },
            autoRefs() {
                return Object.keys(this.$store.state.gcState.autoRefState);
            }
        }
    }
</script>

<style scoped>

    .control-flaw-bar {
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .auto-ref-meta {
        font-size: 1.2em;
        margin: auto .2em;
    }

</style>
