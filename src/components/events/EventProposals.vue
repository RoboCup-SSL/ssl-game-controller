<template>
    <div>
        <h2>Proposed Game Events</h2>
        <div class="content">
            <span v-if="!eventProposalsPresent">None</span>
            <div v-if="eventProposalsPresent" v-for="(proposal, index) in eventProposals"
                 :key="index">
            <span :class="{'team-blue': byTeam(proposal) === 2, 'team-yellow': byTeam(proposal) === 1}">
                {{proposal.gameEvent.type}}
            </span>
                <span>by {{proposal.proposerId}}</span>
                (<span v-format-ns-duration="proposalTimeout(proposal.validUntil)"></span>):
                <p>
                <span v-for="detail in detailsList(proposal)"
                      :key="detail.key">{{detail.key}}: {{detail.value}}<br/></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventProposals",
        computed: {
            state() {
                return this.$store.state.refBoxState
            },
            eventProposals() {
                return this.state.gameEventProposals;
            },
            eventProposalsPresent() {
                return this.eventProposals != null && this.eventProposals.length > 0;
            }
        },
        methods: {
            details(proposal) {
                let key = Object.keys(proposal.gameEvent.details)[0];
                return proposal.gameEvent.details[key];
            },
            detailsStr(proposal) {
                let p = this.details(proposal);
                delete p.by_team;
                return p;
            },
            detailsList(proposal) {
                let list = [];
                let details = this.details(proposal);
                delete details.by_team;
                Object.keys(details).forEach(function (key, i) {
                    list[i] = {key: key, value: details[key]}
                });
                return list;
            },
            byTeam(proposal) {
                let details = this.details(proposal);
                if (details.hasOwnProperty('by_team')) {
                    return details.by_team;
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
        }
    }
</script>

<style scoped>
    .content {
        text-align: left;
        overflow-y: auto;
        max-height: 15em;
    }
</style>