<template>
    <div class="content">
        <div class="proposal-item"
             v-if="eventProposalsPresent"
             v-for="(proposal, index) in eventProposals"
             @click="eventSelected(index)"
             :key="index">
            <span :class="{'team-blue': byTeam(proposal.gameEvent) === 'BLUE', 'team-yellow': byTeam(proposal.gameEvent) === 'YELLOW'}">
                {{proposal.gameEvent.type}}
            </span>
            <p class="details-row"
               v-if="selectedEvent === index"
               v-for="detail in detailsList(proposal.gameEvent)"
               :key="detail.key">{{detail.key}}: {{detail.value}}</p>
            <a class="btn-accept"
               v-b-tooltip.hover.d500
               title="Accept this game event"
               @click="accept(proposal.gameEvent)">
                <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
            </a>
        </div>
    </div>
</template>

<script>
    import {gameEventByTeam, gameEventDetailsList} from "../../gameEvents";

    export default {
        name: "EventProposals",
        data() {
            return {
                selectedEvent: -1,
            }
        },
        computed: {
            eventProposals() {
                return this.$store.state.matchState.gameEventProposals;
            },
            eventProposalsPresent() {
                return this.eventProposals != null && this.eventProposals.length > 0;
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
            detailsList(gameEvent) {
                return gameEventDetailsList(gameEvent);
            },
            byTeam(gameEvent) {
                return gameEventByTeam(gameEvent);
            },
            accept(gameEvent) {
                // TODO
                // submitChange();
                console.log('TODO: submit ' + gameEvent);
            },
        }
    }
</script>

<style scoped>

    .content {
        text-align: center;
    }

    .proposal-item {
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
