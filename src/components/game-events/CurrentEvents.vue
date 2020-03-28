<template>
    <div class="content">
        <span v-if="!gameEventsPresent">None</span>
        <div class="game-event-item"
             v-if="gameEventsPresent"
             v-for="(gameEvent, index) in gameEvents"
             :key="index">
            <span :class="{'team-blue': byTeam(gameEvent) === 'BLUE', 'team-yellow': byTeam(gameEvent) === 'YELLOW'}">
                {{gameEvent.type}}
            </span>
            <p class="details-row"
               v-for="detail in detailsList(gameEvent)"
               :key="detail.key">{{detail.key}}: {{detail.value}}</p>
            <p class="details-row"
               v-if="gameEvent.origins && gameEvent.origins.length > 0">
                Submitted by: {{gameEvent.origins}}
            </p>
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

    export default {
        name: "CurrentEvents",
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
            showAcceptGoal(gameEvent) {
                return !this.goalEventPresent && gameEvent.type === 'POSSIBLE_GOAL';
            },
            details(gameEvent) {
                Object.keys(gameEvent).forEach(function (wrapperKey) {
                    if (wrapperKey !== 'type' && wrapperKey !== 'origin') {
                        return gameEvent[wrapperKey];
                    }
                });
                return {};
            },
            detailsList(gameEvent) {
                let list = [];
                let i = 0;
                let eventDetails = this.details(gameEvent);
                Object.keys(eventDetails).forEach(function (key) {
                    if (key !== 'byTeam') {
                        list[i++] = {key: key, value: eventDetails[key]};
                    }
                });
                return list;
            },
            byTeam(gameEvent) {
                let eventDetails = this.details(gameEvent);
                if (eventDetails.hasOwnProperty('byTeam')) {
                    return eventDetails.byTeam;
                }
                return '';
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
