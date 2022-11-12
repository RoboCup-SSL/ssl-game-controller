<template>
    <div class="control-flaw-bar">
        <div v-help-text="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
            <b-button v-hotkey="keymapHalt"
                      ref="btnHalt"
                      v-on:click="send('HALT')"
                      v-bind:disabled="halted">
                Halt
            </b-button>
        </div>

        <div v-help-text="'Continue based on last game event (' + Object.keys(keymapContinue)[0] + ')'">
            <b-button v-hotkey="keymapContinue"
                      ref="btnContinue"
                      :class="continueButtonClass"
                      v-bind:disabled="continueDisabled"
                      v-on:click="triggerContinue">
                Continue
                <template v-if="botSubstitutionRequested && timeoutRequested"> with timeout and bot substitution</template>
                <template v-else-if="botSubstitutionRequested"> with bot substitution</template>
                <template v-else-if="timeoutRequested"> with timeout</template>
                <template v-else-if="nextCommand && nextCommand.type">with
                    <span :class="teamColorClass">{{ nextCommand.type }}</span>
                </template>
                <span v-for="issue of continuationIssues" v-bind:key="issue">
                    <br>
                    - {{issue}}
                </span>
            </b-button>
        </div>
    </div>
</template>

<script>
import {isNonPausedStage, isPreStage, TEAM_BLUE, TEAM_UNKNOWN, TEAM_YELLOW} from "@/refereeState";
import {submitChange, submitNewCommand} from "@/submit";

export default {
    name: "ControlFlowBar",
    methods: {
        send: function (command) {
            submitNewCommand(command, TEAM_UNKNOWN);
        },
        triggerContinue() {
            submitChange({continueChange: {}});
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
        timeoutActive() {
            return this.$store.state.matchState.command.type === 'TIMEOUT';
        },
        timeoutRequested() {
            return this.$store.state.matchState.teamState[TEAM_YELLOW].requestsTimeoutSince !== null
                || this.$store.state.matchState.teamState[TEAM_BLUE].requestsTimeoutSince !== null;
        },
        botSubstitutionRequested() {
            return this.$store.state.matchState.teamState[TEAM_YELLOW].requestsBotSubstitutionSince !== null
                || this.$store.state.matchState.teamState[TEAM_BLUE].requestsBotSubstitutionSince !== null;
        },
        continueDisabled() {
            return !this.nextCommand && !this.timeoutRequested && !this.botSubstitutionRequested;
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
            if (this.timeoutActive) {
                return {type: 'STOP'}
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
        continueButtonClass() {
            if (this.$store.state.gcState.readyToContinue === null) {
                return '';
            }
            if (this.$store.state.gcState.readyToContinue) {
                return 'continue-btn-ready';
            }
            return 'continue-btn-not-ready';
        },
        continuationIssues() {
            return this.$store.state.gcState.continuationIssues
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

.continue-btn-ready {
    background-color: green;
}

.continue-btn-not-ready {
    background-color: red;
}

</style>
