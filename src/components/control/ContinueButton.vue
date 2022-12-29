<template>
    <b-button :class="continueButtonClass"
              v-on:click="triggerContinue">
        <template v-if="continueAction.type === 'HALT'">
            Halt
        </template>
        <template v-else-if="continueAction.type === 'RESUME_FROM_HALT'">
            Resume
        </template>
        <template v-else-if="continueAction.type === 'STOP_GAME'">
            Stop
        </template>
        <template v-else-if="continueAction.type === 'RESUME_FROM_STOP'">
            Force Start (no next command available)
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
            <br> - {{ issue }}
        </span>
    </b-button>
</template>

<script>
import {TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";
import {submitContinueAction} from "@/submit";

export default {
    name: "ContinueButton",
    props: {
      value: Object
    },
    methods: {
        triggerContinue() {
            submitContinueAction(this.continueAction)
        },
    },
    computed: {
        continueAction() {
          return this.value;
        },
        nextCommand() {
            const command = this.$store.state.matchState.nextCommand;
            if (command !== null) {
                return command.type;
            }
            return "";
        },
        continuationIssues() {
            return this.continueAction.continuationIssues
        },
        teamColorClass() {
            return {
                'team-blue': this.continueAction.forTeam === TEAM_BLUE,
                'team-yellow': this.continueAction.forTeam === TEAM_YELLOW,
            };
        },
        continueButtonClass() {
            return {
                'continue-btn-ready-auto': this.continueAction.state === 'READY_AUTO',
                'continue-btn-ready-manual': this.continueAction.state === 'READY_MANUAL',
                'continue-btn-blocked': this.continueAction.state === 'BLOCKED',
                'continue-btn-waiting': this.continueAction.state === 'WAITING',
            }
        },
    }
}
</script>

<style scoped>

.continue-btn-ready-auto {
    background-color: green;
}

.continue-btn-ready-manual {
    background-color: darkcyan;
}

.continue-btn-waiting {
    background-color: orange;
}

.continue-btn-blocked {
    background-color: red;
}

</style>
