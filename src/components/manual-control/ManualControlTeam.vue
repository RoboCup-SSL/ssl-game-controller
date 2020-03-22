<template>
    <div class="container">
        <b-button v-on:click="addYellowCard"
                  class="manual-control-button"
                  v-bind:disabled="running || preparing">
            Add Yellow Card
        </b-button>

        <b-button v-on:click="revokeYellowCard"
                  class="manual-control-button"
                  v-bind:disabled="!yellowCardActive">
            Revoke Yellow Card
        </b-button>

        <b-button v-on:click="addRedCard"
                  class="manual-control-button"
                  v-bind:disabled="running || preparing">
            Add Red Card
        </b-button>

        <b-button v-on:click="addGoal"
                  class="manual-control-button">
            Goal
        </b-button>

        <ControlTeamTimeout :team-color="teamColor"/>
    </div>
</template>

<script>
    import ControlTeamTimeout from "./ControlTeamTimeout";
    import {isNonPausedStage, TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "ManualControlTeam",
        components: {ControlTeamTimeout},
        props: {
            teamColor: Number
        },
        data() {
            return {
                TEAM_YELLOW: TEAM_YELLOW,
                TEAM_BLUE: TEAM_BLUE
            }
        },
        methods: {
            send: function (command) {
                this.$socket.sendObj({
                    'command': {'forTeam': this.teamColor, 'commandType': command}
                })
            },
            revokeYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'revoke'}})
            },
            addYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'add'}})
            },
            addRedCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'red', 'operation': 'add'}})
            },
            addGoal: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'goal',
                        details: {
                            ['goal']: {
                                by_team: this.teamColor.toString().toLocaleUpperCase(),
                            }
                        }
                    }
                });
            },
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            keymapKickoff() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 1': this.sendKickoff};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 3': this.sendKickoff};
                }
            },
            keymapDirect() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 7': this.sendDirect};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 9': this.sendDirect};
                }
            },
            keymapIndirect() {
                if (this.teamColor === TEAM_YELLOW) {
                    return {'ctrl+alt+numpad 4': this.sendIndirect};
                } else if (this.teamColor === TEAM_BLUE) {
                    return {'ctrl+alt+numpad 6': this.sendIndirect};
                }
            },
            state() {
                return this.$store.state.matchState
            },
            halted() {
                return this.state.command === 'halt';
            },
            running() {
                return this.state.command === 'forceStart'
                    || this.state.command === 'normalStart'
                    || this.state.command === 'direct'
                    || this.state.command === 'indirect';
            },
            preparing() {
                return this.state.command === 'kickoff' || this.state.command === 'penalty';
            },
            nonPausedStage() {
                return isNonPausedStage(this.state);
            },
            yellowCardActive() {
                return this.teamState.yellowCards.some(e => e.timeRemaining > 0);
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: 0;
        padding-right: 0;
    }
</style>
