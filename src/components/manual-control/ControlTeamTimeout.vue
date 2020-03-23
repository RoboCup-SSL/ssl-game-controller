<template>
    <b-button v-on:click="toggleTimeout"
              class="manual-control-button"
              v-bind:disabled="disableTimeoutButton">
        {{timeoutRunning ? 'Stop' : 'Start'}} Timeout
    </b-button>
</template>

<script>
    import {isNonPausedStage, isPreStage, TEAM_UNKNOWN} from "../../refereeState";
    import {submitNewCommand} from "../../main";

    export default {
        name: "ControlTeamTimeout",
        props: {
            teamColor: Number
        },
        computed: {
            command: function () {
                return this.$store.state.matchState.command
            },
            timeoutRunning: function () {
                return this.command === "timeout" && this.$store.state.matchState.commandForTeam === this.teamColor.toString()
            },
            disableTimeoutButton() {
                return !isNonPausedStage(this.$store.state.matchState)
                    && !isPreStage(this.$store.state.matchState);
            },
        },
        methods: {
            toggleTimeout() {
                if (this.timeoutRunning) {
                    submitNewCommand('stop', TEAM_UNKNOWN);
                } else {
                    submitNewCommand('timeout', this.teamColor);
                }
            }
        }
    }
</script>

<style scoped>
</style>
