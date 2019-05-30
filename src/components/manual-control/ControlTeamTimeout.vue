<template>
    <b-button v-on:click="toggleTimeout"
              class="manual-control-button"
              v-bind:disabled="disableTimeoutButton">
        {{timeoutRunning ? 'Stop' : 'Start'}} Timeout
    </b-button>
</template>

<script>
    import {isNonPausedStage, isPreStage} from "../../refereeState";

    export default {
        name: "ControlTeamTimeout",
        props: {
            teamColor: String
        },
        computed: {
            command: function () {
                return this.$store.state.refBoxState.command
            },
            timeoutRunning: function () {
                return this.command === "timeout" && this.$store.state.refBoxState.commandForTeam === this.teamColor.toString()
            },
            disableTimeoutButton() {
                return !isNonPausedStage(this.$store.state.refBoxState)
                    && !isPreStage(this.$store.state.refBoxState);
            },
        },
        methods: {
            toggleTimeout() {
                if (this.timeoutRunning) {
                    this.$socket.sendObj({'command': {'commandType': 'stop'}});
                } else {
                    this.$socket.sendObj({'command': {'commandType': 'timeout', 'forTeam': this.teamColor}});
                }
            }
        }
    }
</script>

<style scoped>
</style>
