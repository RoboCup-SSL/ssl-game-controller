<template>
    <div class="control-team">
        <h2>Team {{teamColor}}</h2>
        <b-button v-hotkey="keymapKickoff" v-on:click="send('kickoff')">Kickoff</b-button>
        <b-button v-hotkey="keymapDirect" v-on:click="send('direct')">Direct</b-button>
        <b-button v-hotkey="keymapIndirect" v-on:click="send('indirect')">Indirect</b-button>
        <b-button v-on:click="send('penalty')">Penalty</b-button>

        <br/>

        <b-button v-on:click="send('goal')">Goal</b-button>
        <b-button v-on:click="addYellowCard" v-hotkey="keymapYellowCard">Yellow Card</b-button>
        <b-button v-on:click="revokeYellowCard" v-if="teamState.yellowCardTimes.length>0">Revoke Yellow Card</b-button>
        <ControlTeamTimeout :team-color="teamColor"/>
    </div>
</template>

<script>
    import ControlTeamTimeout from "./ControlTeamTimeout";

    export default {
        name: "ControlTeam",
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
            addYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'add'}})
            },
            revokeYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'revoke'}})
            },
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            keymapKickoff() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 1': () => this.send('kickoff')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 3': () => this.send('kickoff')};
                }
            },
            keymapDirect() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 7': () => this.send('direct')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 9': () => this.send('direct')};
                }
            },
            keymapIndirect() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 4': () => this.send('indirect')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 6': () => this.send('indirect')};
                }
            },
            keymapYellowCard() {
                switch (this.teamColor) {
                    case 'Yellow':
                        return {'numpad 4': this.addYellowCard};
                    case 'Blue':
                        return {'numpad 6': this.addYellowCard};
                }
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>