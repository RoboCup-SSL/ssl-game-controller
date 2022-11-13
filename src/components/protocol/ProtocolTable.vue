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
                    <p>
                        Match time: {{data.item.matchTimeElapsed}}
                        <br/>
                        Stage time: {{data.item.stageTimeElapsed}}
                    </p>
                    <p>Change {{data.item.id}} by {{data.item.change.origin}}:</p>
                    <pre v-html="entryDetails(data.item)"/>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
    import "../../date.format";
    import {submitChange} from "@/submit";
    import {gameEventDetails} from "@/gameEvents";

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
                    revertChange: {
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
                    case 'newCommandChange':
                        return entry.change.newCommandChange.command.forTeam;
                    case 'addYellowCardChange':
                        return entry.change.addYellowCardChange.forTeam;
                    case 'addRedCardChange':
                        return entry.change.addRedCardChange.forTeam;
                    case 'yellowCardOverChange':
                        return entry.change.yellowCardOverChange.forTeam;
                    case 'addGameEventChange':
                        return gameEventDetails(entry.change.addGameEventChange.gameEvent).byTeam;
                    case 'addPassiveGameEventChange':
                        return gameEventDetails(entry.change.addPassiveGameEventChange.gameEvent).byTeam;
                    case 'addProposalChange':
                        return gameEventDetails(entry.change.addProposalChange.proposal.gameEvent).byTeam;
                    case 'updateTeamStateChange':
                        return entry.change.updateTeamStateChange.forTeam;
                    case 'newGameStateChange':
                        return entry.change.newGameStateChange.gameState.forTeam;
                    default:
                        return undefined;
                }
            },
            isFoul(entry) {
              let protocolType = this.protocolType(entry);
              let gameEventType;
              if (protocolType === 'addGameEventChange') {
                gameEventType = entry.change.addGameEventChange.gameEvent.type;
              } else if (protocolType === 'addProposalChange') {
                gameEventType = entry.change.addProposalChange.proposal.gameEvent.type;
              } else if (protocolType === 'addPassiveGameEventChange') {
                gameEventType = entry.change.addPassiveGameEventChange.gameEvent.type;
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
                    case 'newCommandChange':
                        return 'terminal';
                    case 'changeStageChange':
                        return 'gavel';
                    case 'setBallPlacementPosChange':
                        return 'futbol';
                    case 'addYellowCardChange':
                        return 'chess-board';
                    case 'addRedCardChange':
                        return 'chess-board';
                    case 'yellowCardOverChange':
                        return 'clock';
                    case 'addGameEventChange':
                        return 'exclamation-triangle';
                    case 'addPassiveGameEventChange':
                        return 'recycle';
                    case 'addProposalChange':
                        return 'hand-point-up';
                    case 'startBallPlacementChange':
                        return 'futbol';
                    case 'continueChange':
                        return 'bullhorn';
                    case 'updateConfigChange':
                        return 'edit';
                    case 'updateTeamStateChange':
                        return 'edit';
                    case 'switchColorsChange':
                        return 'edit';
                    case 'revertChange':
                        return 'exclamation';
                    case 'newGameStateChange':
                        return 'gavel';
                    case 'acceptProposalGroupChange':
                        return 'check-circle';
                    default:
                        return 'question-circle';
                }
            },
            titleForEntry(entry) {
                let type = this.protocolType(entry);
                switch (type) {
                    case 'newCommandChange':
                        return 'New command: ' + entry.change.newCommandChange.command.type;
                    case 'changeStageChange':
                        return 'New stage: ' + entry.change.changeStageChange.newStage;
                    case 'setBallPlacementPosChange':
                        return 'New ball placement pos';
                    case 'addYellowCardChange':
                        return 'Yellow card';
                    case 'addRedCardChange':
                        return 'Red card';
                    case 'yellowCardOverChange':
                        return 'Yellow card over';
                    case 'addGameEventChange':
                        return 'New game event: ' + entry.change.addGameEventChange.gameEvent.type;
                    case 'addPassiveGameEventChange':
                        return 'New passive game event: ' + entry.change.addPassiveGameEventChange.gameEvent.type;
                    case 'addProposalChange':
                        return 'New proposal: ' + entry.change.addProposalChange.proposal.gameEvent.type;
                    case 'startBallPlacementChange':
                        return 'Start ball placement';
                    case 'continueChange':
                        return 'Continue';
                    case 'updateConfigChange':
                        return 'Update config';
                    case 'updateTeamStateChange':
                        return 'Update team state';
                    case 'switchColorsChange':
                        return 'Switch colors';
                    case 'revertChange':
                        return 'Revert';
                    case 'newGameStateChange':
                        return 'New game state: ' + entry.change.newGameStateChange.gameState.type;
                    case 'acceptProposalGroupChange':
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
