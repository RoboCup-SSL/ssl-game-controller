<template>
    <div class="game-state-bar">
        <span v-if="state.currentActionTimeRemaining >= 0">
            <span v-format-ns-duration="state.currentActionTimeRemaining"
                  v-b-tooltip.hover
                  title="Remaining time until lack of progress">
            </span>
            |
            </span>
        <span v-b-tooltip.hover title="Next command">
            <span v-if="state.nextCommand !== ''"
                  :class="teamColorClass">
            {{state.nextCommand}}
            </span>
            <span v-if="state.nextCommand === ''">-</span>
        </span>
        |
        <span v-b-tooltip.hover
              title="Current command"
              :class="teamColorClass">
            {{state.command}}
        </span>
        |
        <span v-b-tooltip.hover title="The current stage of the game">
            {{state.stage}}
        </span>
        |
        <span v-b-tooltip.hover
              title="Goals for yellow"
              class="team-yellow">
            {{teamStateYellow.goals}}
        </span>
        :
        <span v-b-tooltip.hover
              title="Goals for blue"
              class="team-blue">
            {{teamStateBlue.goals}}
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
    import {TEAM_YELLOW} from "../refereeState";
    import {TEAM_BLUE} from "../refereeState";

    export default {
        name: 'GameStateBar',
        computed: {
            state() {
                return this.$store.state.matchState
            },
            teamStateYellow() {
                return this.$store.state.matchState.teamState[TEAM_YELLOW]
            },
            teamStateBlue() {
                return this.$store.state.matchState.teamState[TEAM_BLUE]
            },
            teamColorClass() {
                return {
                    'team-blue': this.state.nextCommandFor === TEAM_BLUE,
                    'team-yellow': this.state.nextCommandFor === TEAM_YELLOW
                }
            }
        }
    }
</script>

<style scoped>
    .game-state-bar {
        font-size: 1.2em;
        font-weight: bold;
    }
</style>
