<template>
    <div class="content">
        <div :class="{'proposal-group': true, [groupClass(group)]: true}"
             v-for="(group, groupId) in eventProposalGroups"
             :key="groupId"
            >
            <div class="proposal-item"
                 v-for="(proposal, proposalId) in group.proposals"
                 :key="proposalId">
                <span :class="{[teamClass(proposal)]: true}" @click="eventSelected(groupId, proposalId)">
                    {{proposal.gameEvent.type}}
                </span>
                <p class="details-row"
                   v-if="selectedGroup === groupId && selectedProposal === proposalId"
                   v-for="detail in detailsList(proposal.gameEvent)"
                   :key="detail.key">{{detail.key}}: {{detail.value}}</p>
            </div>
            <a class="btn-accept"
               v-b-tooltip.hover.d500
               title="Accept this proposal group"
               v-if="!group.accepted"
               @click="accept(groupId)">
                <font-awesome-icon icon="check-circle" class="fa-lg"></font-awesome-icon>
            </a>
        </div>
    </div>
</template>

<script>
    import {gameEventByTeam, gameEventDetailsList} from "../../gameEvents";
    import {submitChange} from "../../submit";

    export default {
        name: "EventProposals",
        data() {
            return {
                selectedGroup: -1,
                selectedProposal: -1,
                now: Date.now(),
            }
        },
        computed: {
            eventProposalGroups() {
                return this.$store.state.matchState.proposalGroups;
            },
        },
        methods: {
            blue(proposal) {
                return this.byTeam(proposal.gameEvent) === 'BLUE';
            },
            yellow(proposal) {
                return this.byTeam(proposal.gameEvent) === 'YELLOW';
            },
            teamClass(proposal) {
                const team = this.byTeam(proposal.gameEvent);
                if (team === 'BLUE') {
                    return 'team-blue';
                } else if (team === 'YELLOW') {
                    return 'team-yellow';
                }
                return '';
            },
            groupClass(group) {
              if (group.accepted) {
                  return 'proposal-group-accepted';
              }
              return '';
            },
            eventSelected(groupId, proposalId) {
                if (this.selectedGroup === groupId && this.selectedProposal === proposalId) {
                    this.selectedGroup = -1;
                    this.selectedProposal = -1;
                } else {
                    this.selectedGroup = groupId;
                    this.selectedProposal = proposalId;
                }
            },
            detailsList(gameEvent) {
                return gameEventDetailsList(gameEvent);
            },
            byTeam(gameEvent) {
                return gameEventByTeam(gameEvent);
            },
            accept(groupId) {
                submitChange({
                    acceptProposalGroup: {
                        groupId: groupId,
                        acceptedBy: 'UI'
                    }
                })
            },
        }
    }
</script>

<style scoped>

    .content {
        text-align: center;
    }

    .proposal-group {
        position: relative;
        min-height: 2em;
        border-style: dashed;
        border-width: medium;
        border-radius: 5px;
        padding: 0.0em;
        margin: 0.1em;
        text-align: left;
        border-color: darkgrey;
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

    .proposal-group-accepted {
        border-color: green;
    }

    .btn-accept {
        position: absolute;
        right: 0;
        top: 0;
        margin: -5px;
    }

    .details-row {
        margin-bottom: 0;
    }

</style>
