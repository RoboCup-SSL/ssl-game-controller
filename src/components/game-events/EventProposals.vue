<template>
    <div class="content">
        <div class="proposal-item"
             v-if="eventProposalsPresent"
             v-for="(proposal, index) in eventProposals"
             :key="index">
            <span :class="{'team-blue': byTeam(proposal) === 2, 'team-yellow': byTeam(proposal) === 1}">
                {{proposal.gameEvent.type}}
            </span>
            <span>by {{proposal.proposerId}}</span>
            (<span v-format-ns-duration="proposalTimeout(proposal.validUntil)"></span>):
            <p class="details-row"
               v-for="detail in detailsList(proposal)"
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
    export default {
        name: "EventProposals",
        computed: {
            eventProposals() {
                return this.$store.state.matchState.proposedGameEvents;
            },
            eventProposalsPresent() {
                return this.eventProposals != null && this.eventProposals.length > 0;
            }
        },
        methods: {
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
            proposalTimeout(v) {
                let validUntil = new Date(v);
                let now = Date.now();
                let remaining = validUntil - now;
                if (remaining < 0) {
                    return 0;
                }
                return remaining * 1e6;
            },
            accept(gameEvent) {
                this.$socket.sendObj({
                    gameEvent: gameEvent
                });
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
