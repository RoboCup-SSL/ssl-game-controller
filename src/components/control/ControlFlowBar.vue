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
                <span v-if="nextCommand">with</span>
                <span :class="teamColorClass">
                    {{nextCommand}}
                </span>
            </b-button>
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
                        return 'STOP';
                    }
                    return null;
                }
                if (!this.$store.state.matchState.nextCommand) {
                    return null;
                }
                return this.$store.state.matchState.nextCommand.type;
            },
            teamColorClass() {
                return {
                    'team-blue': this.$store.state.matchState.nextCommand && this.$store.state.matchState.nextCommand.forTeam === TEAM_BLUE,
                    'team-yellow': this.$store.state.matchState.nextCommand && this.$store.state.matchState.nextCommand.forTeam === TEAM_YELLOW
                }
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
</style>
