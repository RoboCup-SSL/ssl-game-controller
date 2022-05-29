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
                <span v-help-text="protocolType(data.item)">
                    <font-awesome-icon :class="{'fa-sm': true, foul: isFoul(data.item)}" :icon="iconForType(protocolType(data.item))" />
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
                     v-help-text="'Revert this event'">
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
    import {gameEventDetails} from "../../gameEvents";

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
                        return gameEventDetails(entry.change.addGameEvent.gameEvent).byTeam;
                    case 'addPassiveGameEvent':
                        return gameEventDetails(entry.change.addPassiveGameEvent.gameEvent).byTeam;
                    case 'addProposal':
                        return gameEventDetails(entry.change.addProposal.proposal.gameEvent).byTeam;
                    case 'updateTeamState':
                        return entry.change.updateTeamState.forTeam;
                    case 'newGameState':
                        return entry.change.newGameState.gameState.forTeam;
                    default:
                        return undefined;
                }
            },
            isFoul(entry) {
              let protocolType = this.protocolType(entry);
              let gameEventType;
              if (protocolType === 'addGameEvent') {
                gameEventType = entry.change.addGameEvent.gameEvent.type;
              } else if (protocolType === 'addProposal') {
                gameEventType = entry.change.addProposal.proposal.gameEvent.type;
              } else if (protocolType === 'addPassiveGameEvent') {
                gameEventType = entry.change.addPassiveGameEvent.gameEvent.type;
              } else {
                return false;
              }
              switch(gameEventType) {
                case 'ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA':
                case 'DEFENDER_IN_DEFENSE_AREA':
                case 'BOUNDARY_CROSSING':
                case 'KEEPER_HELD_BALL':
                case 'BOT_DRIBBLED_BALL_TOO_FAR':
                case 'BOT_PUSHED_BOT':
                case 'BOT_HELD_BALL_DELIBERATELY':
                case 'BOT_TIPPED_OVER':
                case 'ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA':
                case 'BOT_KICKED_BALL_TOO_FAST':
                case 'BOT_CRASH_UNIQUE':
                case 'BOT_CRASH_DRAWN':
                case 'DEFENDER_TOO_CLOSE_TO_KICK_POINT':
                case 'BOT_TOO_FAST_IN_STOP':
                case 'BOT_INTERFERED_PLACEMENT':
                  return true;
              }
              return false;
            },
            iconForType(type) {
                switch (type) {
                    case 'newCommand':
                        return 'terminal';
                    case 'changeStage':
                        return 'gavel';
                    case 'setBallPlacementPos':
                        return 'futbol';
                    case 'addYellowCard':
                        return 'chess-board';
                    case 'addRedCard':
                        return 'chess-board';
                    case 'yellowCardOver':
                        return 'clock';
                    case 'addGameEvent':
                        return 'exclamation-triangle';
                    case 'addPassiveGameEvent':
                        return 'recycle';
                    case 'addProposal':
                        return 'hand-point-up';
                    case 'startBallPlacement':
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
                    case 'newGameState':
                        return 'gavel';
                    case 'acceptProposalGroup':
                        return 'check-circle';
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
                    case 'setBallPlacementPos':
                        return 'New ball placement pos';
                    case 'addYellowCard':
                        return 'Yellow card';
                    case 'addRedCard':
                        return 'Red card';
                    case 'yellowCardOver':
                        return 'Yellow card over';
                    case 'addGameEvent':
                        return 'New game event: ' + entry.change.addGameEvent.gameEvent.type;
                    case 'addPassiveGameEvent':
                        return 'New passive game event: ' + entry.change.addPassiveGameEvent.gameEvent.type;
                    case 'addProposal':
                        return 'New proposal: ' + entry.change.addProposal.proposal.gameEvent.type;
                    case 'startBallPlacement':
                        return 'Start ball placement';
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
                    case 'newGameState':
                        return 'New game state: ' + entry.change.newGameState.gameState.type;
                    case 'acceptProposalGroup':
                        return 'Accept proposals';
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

    .foul {
      color: Tomato;
    }
</style>
