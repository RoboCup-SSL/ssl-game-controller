<template>
    <span>
        <b-button v-show="!timeoutRunning"
                  v-on:click="startTimeout"
                  v-bind:disabled="!inNormalHalf">
            Start Timeout
        </b-button>
        <b-button v-show="timeoutRunning"
                  v-on:click="stopTimeout">
            Stop Timeout
        </b-button>
    </span>
</template>

<script>
    import {isInNormalHalf} from "../../main";

    export default {
        name: "ControlTeamTimeout",
        props: {
            teamColor: String
        },
        computed: {
            gameState: function () {
                return this.$store.state.refBoxState.gameState
            },
            timeoutRunning: function () {
                return this.gameState === "Timeout" && this.$store.state.refBoxState.gameStateForTeam === this.teamColor
            },
            inNormalHalf() {
                return isInNormalHalf(this.$store.state.refBoxState);
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