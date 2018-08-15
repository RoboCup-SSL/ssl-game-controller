<template>
    <div>
        <span v-b-tooltip.hover title="The current stage of the game">
            {{state.stage}}
        </span>
        |
        <span v-format-ns-duration="state.gameTimeElapsed"
              v-b-tooltip.hover
              title="Total time elapsed in the current stage">
        </span>
        |
        <span v-format-ns-duration="state.gameTimeLeft"
              v-b-tooltip.hover
              title="Total time left for this stage">
        </span>
        |
        <span v-format-ns-duration="state.matchDuration"
              v-b-tooltip.hover
              title="Total real time elapsed since the match has been started">
        </span>
        |
        <span v-b-tooltip.hover title="Current game state">
            {{state.gameState}} <span v-if="state.gameStateForTeam != null">for {{state.gameStateForTeam}}</span>
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
