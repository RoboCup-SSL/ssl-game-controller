<template>
    <div>
        <b-button v-on:click="resetMatch">Reset Match</b-button>
        <b-button v-on:click="switchColor">Switch colors</b-button>
        <b-button v-on:click="previousStage">Previous Stage</b-button>
        <b-button v-on:click="nextStage">Next Stage</b-button>
    </div>
</template>

<script>
    export default {
        name: "ControlMatch",
        methods: {
            resetMatch: function () {
                this.$socket.sendObj({'trigger': {'triggerType': 'resetMatch'}})
            },
            switchColor: function () {
                this.$socket.sendObj({'trigger': {'triggerType': 'switchColor'}})
            },
            previousStage: function () {
                this.$socket.sendObj({'stage': {'stageOperation': 'previous'}})
            },
            nextStage: function () {
                this.$socket.sendObj({'stage': {'stageOperation': 'next'}})
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>