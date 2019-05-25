<template>
    <div>
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
