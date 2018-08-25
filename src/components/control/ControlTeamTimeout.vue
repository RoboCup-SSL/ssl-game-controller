<template>
    <span>
        <b-button v-show="!timeoutRunning"
                  v-on:click="startTimeout"
                  v-bind:disabled="disableTimeoutButton">
            Start Timeout
        </b-button>
        <b-button v-show="timeoutRunning"
                  v-on:click="stopTimeout">
            Stop Timeout
        </b-button>
    </span>
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
                return this.command === "timeout" && this.$store.state.refBoxState.commandForTeam === this.teamColor
            },
            disableTimeoutButton() {
                return !isNonPausedStage(this.$store.state.refBoxState)
                    && !isPreStage(this.$store.state.refBoxState);
            },
        },
        methods: {
            startTimeout: function () {
                this.$socket.sendObj({'command': {'commandType': 'timeout', 'forTeam': this.teamColor}})
            },
            stopTimeout: function () {
                this.$socket.sendObj({'command': {'commandType': 'stop'}})
            },
        }
    }
</script>

<style scoped>

</style>