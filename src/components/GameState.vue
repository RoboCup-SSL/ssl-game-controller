<template>
    <div>
        <span v-if="state.currentActionTimeRemaining >= 0">
            <span v-format-ns-duration="state.currentActionTimeRemaining"
                  v-b-tooltip.hover
                  title="Remaining time until lack of progress">
            </span>
            |
            </span>
        <span v-b-tooltip.hover title="Next command">
            <span v-if="state.nextCommand !== ''"
                  :class="{'team-blue': state.nextCommandFor === 'Blue', 'team-yellow': state.nextCommandFor === 'Yellow'}">
            {{state.nextCommand}}
            </span>
            <span v-if="state.nextCommand === ''">-</span>
        </span>
        |
        <span v-b-tooltip.hover title="Last game event">
            <span v-if="state.gameEvents.length > 0">{{state.gameEvents[0].type}}</span>
            <span v-if="state.gameEvents.length === 0">-</span>
        </span>
        <span v-if="state.gameEvents.length > 1"
              v-b-tooltip.hover title="Additional game events">
                (+{{state.gameEvents.length-1}})
        </span>
        |
        <span v-b-tooltip.hover title="The current stage of the game">
            {{state.stage}}
        </span>
        |
        <span v-b-tooltip.hover
              title="Current command"
              :class="{'team-blue': state.commandForTeam === 'Blue', 'team-yellow': state.commandForTeam === 'Yellow'}">
            {{state.command}}
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
