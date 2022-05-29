<template>
    <div class="content">
        <span v-if="!gameEventsPresent">None</span>
        <div v-if="gameEventsPresent"
             v-for="(gameEvent, index) in gameEvents"
             :class="{'game-event-item': true, 'attention': isChallengeFlag(gameEvent)}"
             :key="index">
            <span :class="{[teamClass(gameEvent)]: true}" @click="eventSelected(index)">
                {{ gameEvent.type }}
            </span>
            <div class="event_buttons"
                 v-if="showAcceptAndRejectGoal(gameEvent)">
                <a @click="rejectGoal(gameEvent)"
                   v-help-text="'Reject this goal'">
                    <font-awesome-icon icon="times-circle" class="fa-lg"></font-awesome-icon>
                </a>
                <a @click="acceptGoal(gameEvent)"
                   v-help-text="'Accept this goal'">
                    <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
                </a>
            </div>
            <p class="details-row"
               v-if="selectedEvent === index"
               v-for="detail in detailsList(gameEvent)"
               :key="detail.key">{{ detail.key }}: {{ detail.value }}</p>
        </div>
    </div>
</template>

<script>
import {submitGameEvent} from "@/submit";
import {gameEventByTeam, gameEventDetailsList} from "@/gameEvents";
import {TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";

export default {
    name: "CurrentEvents",
    data() {
        return {
            selectedEvent: -1,
        }
    },
    computed: {
        gameEvents() {
            return this.$store.state.matchState.gameEvents;
        },
        gameEventsPresent() {
            return this.gameEvents && this.gameEvents.length > 0;
        },
        goalOrBallLeftFieldEventPresent() {
            for (let event of this.$store.state.matchState.gameEvents) {
                if (event.type === 'GOAL' || event.type === 'BALL_LEFT_FIELD_GOAL_LINE') {
                    return true;
                }
            }
            return false;
        },
    },
    methods: {
        teamClass(gameEvent) {
            const team = this.byTeam(gameEvent);
            if (team === 'BLUE') {
                return 'team-blue';
            } else if (team === 'YELLOW') {
                return 'team-yellow';
            }
            return '';
        },
        eventSelected(index) {
            if (this.selectedEvent === index) {
                this.selectedEvent = -1;
            } else {
                this.selectedEvent = index;
            }
        },
        showAcceptAndRejectGoal(gameEvent) {
            return !this.goalOrBallLeftFieldEventPresent && gameEvent.type === 'POSSIBLE_GOAL';
        },
        isChallengeFlag(gameEvent) {
            return !this.goalOrBallLeftFieldEventPresent && gameEvent.type === 'CHALLENGE_FLAG';
        },
        detailsList(gameEvent) {
            return gameEventDetailsList(gameEvent);
        },
        byTeam(gameEvent) {
            return gameEventByTeam(gameEvent);
        },
        acceptGoal(gameEvent) {
            submitGameEvent({
                type: 'GOAL',
                origins: gameEvent.origins,
                goal: gameEvent.possibleGoal
            });
        },
        rejectGoal(gameEvent) {
            let team = gameEvent.possibleGoal.kickingTeam;
            if (team === null) {
                team = (gameEvent.possibleGoal.by_team === TEAM_BLUE) ? TEAM_YELLOW : TEAM_BLUE;
            }
            submitGameEvent({
                type: 'BALL_LEFT_FIELD_GOAL_LINE',
                ballLeftFieldGoalLine: {
                    by_team: team,
                    by_bot: gameEvent.possibleGoal.kickingBot,
                    location: gameEvent.possibleGoal.location
                }
            });
        },
    }
}
</script>

<style scoped>
.content {
    text-align: center;
}

.game-event-item {
    position: relative;
    min-height: 2em;
    border-style: dotted;
    border-width: thin;
    border-radius: 5px;
    padding: 0.2em;
    margin: 0.2em;
    text-align: left;
}

.event_buttons {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.3em;
}

.attention {
    background-color: red;
}

.details-row {
    margin-bottom: 0;
}
</style>
