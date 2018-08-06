<template>
    <div>
        <b-button v-b-tooltip.hover title="Start a new match by resetting everything"
                  v-on:click="resetMatch">
            Reset Match
        </b-button>
        <b-button v-b-tooltip.hover title="Undo the last state change"
                  v-on:click="undo">
            Undo
        </b-button>
        <b-button v-b-tooltip.hover title="Switch the colors of the teams, keep everything else"
                  v-on:click="switchColor">
            Switch colors
        </b-button>
        <b-button v-b-tooltip.hover title="Switch the playing half (the goal) of the teams"
                  v-on:click="switchSides">
            Switch sides
        </b-button>
        <b-button v-b-tooltip.hover title="Change back to the previous stage (if something went wrong)"
                  v-on:click="previousStage">
            Previous Stage
        </b-button>
        <b-button v-b-tooltip.hover title="Proceed to the next stage"
                  v-on:click="nextStage">
            Next Stage
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
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>