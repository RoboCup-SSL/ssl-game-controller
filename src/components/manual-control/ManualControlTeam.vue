<template>
    <div class="container">
        <b-button v-on:click="addYellowCard"
                  v-bind:disabled="running || preparing">
            Add Yellow Card
        </b-button>

        <b-button v-on:click="revokeYellowCard"
                  v-bind:disabled="teamState.yellowCardTimes.length===0">
            Revoke Yellow Card
        </b-button>

        <b-button v-on:click="addRedCard"
                  v-bind:disabled="running || preparing">
            Add Red Card
        </b-button>

        <b-button v-on:click="addGoal">
            Goal
        </b-button>

        <ControlTeamTimeout :team-color="teamColor"/>
    </div>
</template>

<script>
    import ControlTeamTimeout from "./ControlTeamTimeout";
    import {isNonPausedStage} from "../../refereeState";

    export default {
        name: "ManualControlTeam",
        components: {ControlTeamTimeout},
        props: {
            teamColor: String
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
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            keymapKickoff() {
                if (this.teamColor === 'Yellow') {
                    return {'ctrl+alt+numpad 1': this.sendKickoff};
                } else if (this.teamColor === 'Blue') {
                    return {'ctrl+alt+numpad 3': this.sendKickoff};
                }
            },
            keymapDirect() {
                if (this.teamColor === 'Yellow') {
                    return {'ctrl+alt+numpad 7': this.sendDirect};
                } else if (this.teamColor === 'Blue') {
                    return {'ctrl+alt+numpad 9': this.sendDirect};
                }
            },
            keymapIndirect() {
                if (this.teamColor === 'Yellow') {
                    return {'ctrl+alt+numpad 4': this.sendIndirect};
                } else if (this.teamColor === 'Blue') {
                    return {'ctrl+alt+numpad 6': this.sendIndirect};
                }
            },
            state() {
                return this.$store.state.refBoxState
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

    button {
        margin: 0.5em;
        width: 90%;
    }
</style>
