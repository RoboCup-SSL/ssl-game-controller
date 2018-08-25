<template>
    <div>
        <b-button v-b-tooltip.hover title="Start a new match by resetting everything"
                  v-on:click="resetMatch"
                  :disabled="forbidMatchControls">
            Reset Match
        </b-button>
        <b-button v-b-tooltip.hover title="Undo the last state change"
                  v-on:click="undo">
            Undo
        </b-button>
        <b-button v-b-tooltip.hover title="Switch the colors of the teams, keep everything else"
                  v-on:click="switchColor"
                  :disabled="forbidMatchControls">
            Switch colors
        </b-button>
        <b-button v-b-tooltip.hover title="Switch the playing half (the goal) of the teams"
                  v-on:click="switchSides"
                  :disabled="forbidMatchControls">
            Switch sides
        </b-button>
        <b-button v-b-tooltip.hover title="Change back to the previous stage (if something went wrong)"
                  v-on:click="previousStage"
                  :disabled="forbidMatchControls || noPreviousStage">
            Previous Stage
        </b-button>
        <b-button v-b-tooltip.hover title="Proceed to the next stage"
                  v-on:click="nextStage"
                  :disabled="forbidMatchControls || noNextStage">
            Next Stage
        </b-button>
        <b-button v-b-tooltip.hover title="Finish the game"
                  v-on:click="endGame"
                  :disabled="forbidMatchControls || noNextStage">
            End of Game
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "ControlMatch",
        methods: {
            resetMatch: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'resetMatch'}
                })
            },
            switchColor: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'switchColor'}
                })
            },
            switchSides: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'switchSides'}
                })
            },
            undo: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'undo'}
                })
            },
            previousStage: function () {
                this.$socket.sendObj({
                    'stage': {'stageOperation': 'previous'}
                })
            },
            nextStage: function () {
                this.$socket.sendObj({
                    'stage': {'stageOperation': 'next'}
                })
            },
            endGame: function () {
                this.$socket.sendObj({
                    'stage': {'stageOperation': 'endGame'}
                })
            },
        },
        computed: {
            state() {
                return this.$store.state.refBoxState
            },
            halted() {
                return this.state.command === 'halt';
            },
            stopped() {
                return this.state.command === 'stop';
            },
            forbidMatchControls() {
                return !this.stopped && !this.halted;
            },
            noPreviousStage() {
                return this.state.stage === 'Pre-First Half';
            },
            noNextStage() {
                return this.state.stage === 'End of Game';
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>