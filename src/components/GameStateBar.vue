<template>
    <div class="game-state-bar">
        <span v-if="state.currentActionTimeRemaining >= 0">
            <span v-format-ns-duration="state.currentActionTimeRemaining"
                  v-b-tooltip.hover.d500
                  title="Remaining time until lack of progress">
            </span>
            |
            </span>
        <span v-b-tooltip.hover.d500 title="Next command">
            <span v-if="state.nextCommand !== null"
                  :class="teamColorClassNextCommand">
            {{state.nextCommand}}
            </span>
            <span v-else>-</span>
        </span>
        |
        <span v-b-tooltip.hover.d500
              title="Current command"
              :class="teamColorClassCommand">
            {{state.command.type}}
        </span>
        |
        <span v-b-tooltip.hover.d500 title="The current stage of the game">
            {{state.stage}}
        </span>
        |
        <span v-b-tooltip.hover.d500
              title="Goals for yellow"
              class="team-yellow">
            {{teamStateYellow.goals}}
        </span>
        :
        <span v-b-tooltip.hover.d500
              title="Goals for blue"
              class="team-blue">
            {{teamStateBlue.goals}}
        </span>
        |
        <span v-format-ns-duration="state.stageTimeElapsed"
              v-b-tooltip.hover.d500
              title="Total time elapsed in the current stage">
        </span>
        |
        <span v-format-ns-duration="state.stageTimeLeft"
              v-b-tooltip.hover.d500
              title="Total time left for this stage">
        </span>
        |
        <span v-format-ns-duration="state.matchDuration"
              v-b-tooltip.hover.d500
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
            teamColorClassNextCommand() {
                return {
                    'team-blue': this.state.nextCommand && this.state.nextCommand.forTeam === TEAM_BLUE,
                    'team-yellow': this.state.nextCommand && this.state.nextCommand.forTeam === TEAM_YELLOW
                }
            },
            teamColorClassCommand() {
                return {
                    'team-blue': this.state.command.forTeam === TEAM_BLUE,
                    'team-yellow': this.state.command.forTeam === TEAM_YELLOW
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
