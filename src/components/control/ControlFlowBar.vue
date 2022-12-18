<template>
    <div class="control-flaw-bar">
        <div v-help-text="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
            <b-button v-hotkey="keymapHalt"
                      ref="btnHalt"
                      v-on:click="sendHalt"
                      v-bind:disabled="halted">
                Halt
            </b-button>
        </div>

        <div v-help-text="'Continue with next action (' + Object.keys(keymapContinue)[0] + ')'">
            <b-button v-hotkey="keymapContinue"
                      ref="btnContinue"
                      :class="continueButtonClass"
                      v-bind:disabled="continueAction === null"
                      v-on:click="triggerContinue">
                <template v-if="continueAction !== null">
                    <template v-if="continueAction.type === 'HALT'">
                        Halt
                    </template>
                    <template v-else-if="continueAction.type === 'STOP'">
                        Stop
                    </template>
                    <template v-else-if="continueAction.type === 'NEXT_COMMAND'">
                        <span :class="teamColorClass">{{ nextCommand.type }}</span>
                    </template>
                    <template v-else-if="continueAction.type === 'BALL_PLACEMENT'">
                        <span :class="teamColorClass">Ball Placement</span>
                    </template>
                    <template v-else-if="continueAction.type === 'TIMEOUT_START'">
                        <span :class="teamColorClass">Start Timeout</span>
                    </template>
                    <template v-else-if="continueAction.type === 'TIMEOUT_STOP'">
                        <span :class="teamColorClass">Stop Timeout</span>
                    </template>
                    <template v-else-if="continueAction.type === 'BOT_SUBSTITUTION'">
                        <span :class="teamColorClass">Bot Substitution</span>
                    </template>
                    <span v-for="issue of continuationIssues" v-bind:key="issue">
                    <br>
                    - {{ issue }}
                </span>
                </template>
                <template v-else>
                    No next action available
                </template>
            </b-button>
        </div>
    </div>
</template>

<script>
import {TEAM_BLUE, TEAM_UNKNOWN, TEAM_YELLOW} from "@/refereeState";
import {submitContinueAction, submitNewCommand} from "@/submit";

export default {
    name: "ControlFlowBar",
    methods: {
        sendHalt() {
            submitNewCommand('HALT', TEAM_UNKNOWN);
        },
        triggerContinue() {
            submitContinueAction(this.continueAction)
        },
    },
    computed: {
        keymapHalt() {
            return {
                'esc': () => {
                    if (!this.$refs.btnHalt.disabled) {
                        this.sendHalt()
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
        nextCommand() {
            return this.$store.state.matchState.nextCommand;
        },
        continueAction() {
            return this.$store.state.gcState.continueAction;
        },
        continuationIssues() {
            if (this.continueAction === null) {
                return []
            }
            return this.continueAction.continuationIssues
        },
        readyToContinue() {
            return this.continueAction !== null &&
                this.continueAction.continuationIssues.length === 0;
        },
        teamColorClass() {
            return {
                'team-blue': this.continueAction.forTeam === TEAM_BLUE,
                'team-yellow': this.continueAction.forTeam === TEAM_YELLOW,
            }
        },
        continueButtonClass() {
            if (this.readyToContinue) {
                return 'continue-btn-ready';
            }
            return 'continue-btn-not-ready';
        },
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
