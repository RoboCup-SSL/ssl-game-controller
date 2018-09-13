<template>
    <div>
        <span v-b-tooltip.hover title="Last game event" v-if="state.gameEvents.length > 0">
            {{state.gameEvents[0].type}}
            |
        </span>

        <span v-b-tooltip.hover title="The current stage of the game">
            {{state.stage}}
        </span>
        |
        <span v-b-tooltip.hover title="Current command">
            {{state.command}} <span v-if="state.commandForTeam !== ''">for {{state.commandForTeam}}</span>
        </span>
        |
        <span v-format-ns-duration="state.stageTimeElapsed"
              v-b-tooltip.hover
              title="Total time elapsed in the current stage">
        </span>
        |
        <span v-format-ns-duration="state.stageTimeLeft"
              v-b-tooltip.hover
              title="Total time left for this stage">
        </span>
        |
        <span v-format-ns-duration="state.matchDuration"
              v-b-tooltip.hover
              title="Total real time elapsed since the match has been started">
        </span>
    </div>
</template>

<script>
    export default {
        name: 'GameState',
        computed: {
            state() {
                return this.$store.state.refBoxState
            }
        }
    }
</script>

<style scoped>
</style>
