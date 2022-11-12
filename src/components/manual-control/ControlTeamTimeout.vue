<template>
    <b-button v-on:click="toggleTimeout"
              class="manual-control-button"
              v-bind:disabled="disableTimeoutButton">
        {{timeoutRunning ? 'Stop' : 'Start'}} Timeout
    </b-button>
</template>

<script>
    import {isNonPausedStage, isPreStage, TEAM_UNKNOWN} from "@/refereeState";
    import {submitNewCommand} from "@/submit";

    export default {
        name: "ControlTeamTimeout",
        props: {
            teamColor: String
        },
        computed: {
            timeoutRunning: function () {
                return this.$store.state.matchState.command.type === "TIMEOUT" && this.$store.state.matchState.command.forTeam === this.teamColor
            },
            disableTimeoutButton() {
                return !isNonPausedStage(this.$store.state.matchState)
                    && !isPreStage(this.$store.state.matchState);
            },
        },
        methods: {
            toggleTimeout() {
                if (this.timeoutRunning) {
                    submitNewCommand('STOP', TEAM_UNKNOWN);
                } else {
                    submitNewCommand('TIMEOUT', this.teamColor);
                }
            }
        }
    }
</script>

<style scoped>
</style>
