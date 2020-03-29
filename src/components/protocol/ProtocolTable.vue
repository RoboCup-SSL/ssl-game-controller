<template>
    <div>
        <b-table striped hover small
                 responsive="true"
                 sticky-header="80vh"
                 selectable
                 @row-clicked="onRowClicked"
                 :items="protocol"
                 :fields="fields">
            <template slot="HEAD_name">
                <div style="text-align: left; width: 100%;">Description</div>
            </template>
            <template v-slot:cell(type)="data">
                <span v-b-tooltip.hover.d500 :title="protocolType(data.item)">
                    <font-awesome-icon class="fa-sm" :icon="iconForType(protocolType(data.item))"/>
                </span>
            </template>
            <template v-slot:cell(time)="data">
                <span v-format-ns-duration="data.item.matchTimeElapsed"></span>
                <span> | </span>
                <span v-format-ns-duration="data.item.stageTimeElapsed"></span>
            </template>
            <template v-slot:cell(title)="data">
                <div style="text-align: left; width: 100%;"
                     :class="{'team-blue': protocolForTeam(data.item) === 'BLUE', 'team-yellow': protocolForTeam(data.item) === 'YELLOW'}">
                    {{titleForEntry(data.item)}}
                </div>
            </template>
            <template v-slot:cell(revert)="data">
                <div class="btn-revert"
                     v-if="data.item.change.revertible"
                     v-b-tooltip.hover.d500.righttop="'Revert this event'">
                    <a @click="revertProtocolEntry(data.item.id)">
                        <font-awesome-icon icon="history" class="fa-sm"></font-awesome-icon>
                    </a>
                </div>
            </template>

            <template v-slot:row-details="data">
                <div class="row-details">
                    <p>Change {{data.item.id}} by {{data.item.change.origin}}:</p>
                    <pre v-html="entryDetails(data.item)"/>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
    import "../../date.format";
    import {submitChange} from "../../submit";

    export default {
        name: "EventTable",
        data() {
            return {
                fields: [
                    {
                        key: 'type',
                    },
                    {
                        key: 'time',
                    },
                    {
                        key: 'title',
                    },
                    {
                        key: 'revert',
                    },
                ],
            }
        },
        computed: {
            protocol() {
                return this.$store.state.protocol;
            }
        },
        methods: {
            onRowClicked(row) {
                row._showDetails = !row._showDetails;
            },
            revertProtocolEntry(id) {
                submitChange({
                    revert: {
                        changeId: id
                    }
                });
            },
            protocolType(entry) {
                for (let key of Object.keys(entry.change)) {
                    if (key !== 'origin' && key !== 'revertible') {
                        return key;
                    }
                }
                return '';
            },
            entryDetails(entry) {
                let type = this.protocolType(entry);
                return JSON.stringify(entry.change[type], null, 2);
            },
            protocolForTeam(entry) {
                let type = this.protocolType(entry);
                switch (type) {
                    case 'newCommand':
                        return entry.change.newCommand.command.forTeam;
                    case 'addYellowCard':
                        return entry.change.addYellowCard.forTeam;
                    case 'addRedCard':
                        return entry.change.addRedCard.forTeam;
                    case 'yellowCardOver':
                        return entry.change.yellowCardOver.forTeam;
                    case 'addGameEvent':
                        return entry.change.addGameEvent.gameEvent.forTeam;
                    case 'addProposedGameEvent':
                        return entry.change.addProposedGameEvent.gameEvent.forTeam;
                    case 'updateTeamState':
                        return entry.change.updateTeamState.forTeam;
                    default:
                        return undefined;
                }
            },
            iconForType(type) {
                switch (type) {
                    case 'newCommand':
                        return 'terminal';
                    case 'changeStage':
                        return 'gavel';
                    case 'addYellowCard':
                        return 'chess-board';
                    case 'addRedCard':
                        return 'chess-board';
                    case 'yellowCardOver':
                        return 'clock';
                    case 'addGameEvent':
                        return 'exclamation-triangle';
                    case 'addProposedGameEvent':
                        return 'recycle';
                    case 'startBallPlacement':
                        return 'futbol';
                    case 'setBallPlacementPos':
                        return 'futbol';
                    case 'continue':
                        return 'bullhorn';
                    case 'updateConfig':
                        return 'edit';
                    case 'updateTeamState':
                        return 'edit';
                    case 'switchColors':
                        return 'edit';
                    case 'revert':
                        return 'exclamation';
                    default:
                        return 'question-circle';
                }
            },
            titleForEntry(entry) {
                let type = this.protocolType(entry);
                switch (type) {
                    case 'newCommand':
                        return 'New command: ' + entry.change.newCommand.command.type;
                    case 'changeStage':
                        return 'New stage: ' + entry.change.changeStage.newStage;
                    case 'addYellowCard':
                        return 'Yellow card';
                    case 'addRedCard':
                        return 'Red card';
                    case 'yellowCardOver':
                        return 'Yellow card over';
                    case 'addGameEvent':
                        return 'New game event: ' + entry.change.addGameEvent.gameEvent.type;
                    case 'addProposedGameEvent':
                        return 'New proposed game event: ' + entry.change.addProposedGameEvent.gameEvent.type;
                    case 'startBallPlacement':
                        return 'Start ball placement';
                    case 'setBallPlacementPos':
                        return 'New ball placement pos';
                    case 'continue':
                        return 'Continue';
                    case 'updateConfig':
                        return 'Update config';
                    case 'updateTeamState':
                        return 'Update team state';
                    case 'switchColors':
                        return 'Switch colors';
                    case 'revert':
                        return 'Revert';
                    default:
                        return type;
                }
            }
        }
    }
</script>

<style scoped>
    .row-details {
        text-align: left;
        margin-left: 50px;
    }
</style>
