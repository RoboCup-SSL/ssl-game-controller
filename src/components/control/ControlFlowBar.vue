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
                    <template v-else-if="continueAction.type === 'RESUME_FROM_HALT'">
                        Resume
                    </template>
                    <template v-else-if="continueAction.type === 'STOP_GAME'">
                        Stop
                    </template>
                    <template v-else-if="continueAction.type === 'NEXT_COMMAND'">
                        <span :class="teamColorClass">{{ nextCommand }}</span>
                    </template>
                    <template v-else-if="continueAction.type === 'BALL_PLACEMENT_START'">
                        Start <span :class="teamColorClass">Ball Placement</span>
                    </template>
                    <template v-else-if="continueAction.type === 'BALL_PLACEMENT_CANCEL'">
                        Cancel <span :class="teamColorClass">Ball Placement</span>
                    </template>
                    <template v-else-if="continueAction.type === 'TIMEOUT_START'">
                        Start <span :class="teamColorClass">Timeout</span>
                    </template>
                    <template v-else-if="continueAction.type === 'TIMEOUT_STOP'">
                        Stop <span :class="teamColorClass">Timeout</span>
                    </template>
                    <template v-else-if="continueAction.type === 'BOT_SUBSTITUTION'">
                        Start <span :class="teamColorClass">Bot Substitution</span>
                    </template>
                    <template v-else-if="continueAction.type === 'NEXT_STAGE'">
                        Next stage
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
            const command = this.$store.state.matchState.nextCommand;
            if (command !== null) {
                return command.type;
            }
            return "";
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
                this.continueAction.ready;
        },
        teamColorClass() {
            if (this.continueAction === null) {
                return {};
            }
            return {
                'team-blue': this.continueAction.forTeam === TEAM_BLUE,
                'team-yellow': this.continueAction.forTeam === TEAM_YELLOW,
            };
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
