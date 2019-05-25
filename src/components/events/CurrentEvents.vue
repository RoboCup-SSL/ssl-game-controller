<template>
    <div>
        <h2>Current Game Events</h2>
        <div class="content">
            <span v-if="!gameEventsPresent">None</span>
            <div class="game-event-item"
                 v-if="gameEventsPresent"
                 v-for="(gameEvent, index) in gameEvents"
                 :key="index">
                <span :class="{'team-blue': byTeam(gameEvent) === 2, 'team-yellow': byTeam(gameEvent) === 1}">
                    {{gameEvent.type}}
                </span>
                <p>
                <span v-for="detail in detailsList(gameEvent)"
                      :key="detail.key">{{detail.key}}: {{detail.value}}<br/></span>
                </p>
                <div class="buttons">
                    <div class="btn-revoke"
                         v-b-tooltip.hover.righttop="'Revoke this game event'">
                        <a @click="revoke(index)">
                            <font-awesome-icon icon="times-circle" class="fa-lg"></font-awesome-icon>
                        </a>
                    </div>
                    <div class="btn-accept"
                         v-if="gameEvent.type === 'possibleGoal'"
                         v-b-tooltip.hover.righttop="'Accept this game event'">
                        <a @click="acceptGoal(gameEvent)">
                            <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CurrentEvents",
        computed: {
            state() {
                return this.$store.state.refBoxState
            },
            gameEvents() {
                return this.state.gameEvents;
            },
            gameEventsPresent() {
                return this.gameEvents != null && this.gameEvents.length > 0;
            }
        },
        methods: {
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
            revoke(index) {
                this.$socket.sendObj({
                    "modify": {"removeGameEvent": index}
                });
            },
            acceptGoal(gameEvent) {
                let goalEvent = {};
                Object.assign(goalEvent, gameEvent);
                goalEvent.type = 'goal';
                this.$socket.sendObj({
                    gameEvent: goalEvent
                });
            },
        }
    }
</script>

<style scoped>
    .content {
        text-align: left;
        overflow-y: auto;
        max-height: 15em;
    }

    .game-event-item {
        position: relative;
        min-height: 2em;
    }

    .buttons {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 0.0em;
        display: flex;
    }

    .btn-revoke {
        margin: 0.1em;
    }

    .btn-accept {
        margin: 0.1em;
    }
</style>
