<template>
    <div class="content">
        <span v-if="!gameEventsPresent">None</span>
        <div class="game-event-item"
             v-if="gameEventsPresent"
             v-for="(gameEvent, index) in gameEvents"
             @click="eventSelected(index)"
             :key="index">
            <span :class="{'team-blue': byTeam(gameEvent) === 'BLUE', 'team-yellow': byTeam(gameEvent) === 'YELLOW'}">
                {{gameEvent.type}}
            </span>
            <p class="details-row"
               v-if="selectedEvent === index"
               v-for="detail in detailsList(gameEvent)"
               :key="detail.key">{{detail.key}}: {{detail.value}}</p>
            <div class="btn-accept"
                 v-if="showAcceptGoal(gameEvent)"
                 v-b-tooltip.hover.d500.righttop="'Accept this goal'">
                <a @click="acceptGoal(gameEvent)">
                    <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import {submitGameEvent} from "../../submit";
    import {gameEventByTeam, gameEventDetailsList} from "../../gameEvents";

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
            goalEventPresent() {
                for (let event of this.$store.state.matchState.gameEvents) {
                    if (event.type === 'GOAL') {
                        return true;
                    }
                }
                return false;
            }
        },
        methods: {
            eventSelected(index) {
                if (this.selectedEvent === index) {
                    this.selectedEvent = -1;
                } else {
                    this.selectedEvent = index;
                }
            },
            showAcceptGoal(gameEvent) {
                return !this.goalEventPresent && gameEvent.type === 'POSSIBLE_GOAL';
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

    .btn-accept {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 0.3em;
    }

    .details-row {
        margin-bottom: 0;
    }
</style>
