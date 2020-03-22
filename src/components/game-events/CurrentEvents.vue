<template>
    <div class="content">
        <span v-if="!gameEventsPresent">None</span>
        <div class="game-event-item"
             v-if="gameEventsPresent"
             v-for="(gameEvent, index) in gameEvents"
             :key="index">
            <span :class="{'team-blue': byTeam(gameEvent) === 2, 'team-yellow': byTeam(gameEvent) === 1}">
                {{gameEvent.type}}
            </span>
            <p class="details-row"
               v-for="detail in detailsList(gameEvent)"
               :key="detail.key">{{detail.key}}: {{detail.value}}</p>
            <p class="details-row"
               v-if="gameEvent.origins !== null && gameEvent.origins.length > 0">
                Submitted by: {{gameEvent.origins}}
            </p>
            <div class="btn-accept"
                 v-if="showAcceptGoal(gameEvent)"
                 v-b-tooltip.hover.righttop="'Accept this goal'">
                <a @click="acceptGoal(gameEvent)">
                    <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CurrentEvents",
        computed: {
            state() {
                return this.$store.state.matchState
            },
            gameEvents() {
                return this.state.gameEvents;
            },
            gameEventsPresent() {
                return this.gameEvents != null && this.gameEvents.length > 0;
            },
            goalEventPresent() {
                for (let event of this.state.gameEvents) {
                    if (event.type === 'goal') {
                        return true;
                    }
                }
                return false;
            }
        },
        methods: {
            showAcceptGoal(gameEvent) {
                return !this.goalEventPresent && gameEvent.type === 'possibleGoal';
            },
            details(gameEvent) {
                let key = Object.keys(gameEvent.details)[0];
                return gameEvent.details[key];
            },
            detailsList(gameEvent) {
                let list = [];
                let details = this.details(gameEvent);
                let i = 0;
                Object.keys(details).forEach(function (key) {
                    if (key !== 'by_team') {
                        list[i++] = {key: key, value: details[key]};
                    }
                });
                return list;
            },
            byTeam(gameEvent) {
                let details = this.details(gameEvent);
                if (details.hasOwnProperty('by_team')) {
                    return details.by_team;
                }
                return '';
            },
            acceptGoal(gameEvent) {
                let goalEvent = {type: 'goal', origins: gameEvent.origins, details: {goal: {}}};
                Object.assign(goalEvent.details.goal, gameEvent.details.possibleGoal);
                this.$socket.sendObj({
                    gameEvent: goalEvent
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
