<template>
    <div class="team-cards">
        <EditableLabelNumber
                label="Red cards: "
                :value="redCards"
                :callback="updateRedCards"
                :min="0"
                :max="99"/>
        <b-button class="revoke-card-button" v-hotkey="keymap" v-on:click="revokeRedCard">-</b-button>
        <b-button class="add-card-button" v-hotkey="keymap" v-on:click="addRedCard">+</b-button>

        <EditableLabelNumber
                label="Yellow cards: "
                :value="yellowCards"
                :callback="updateYellowCards"
                :min="0"
                :max="99"/>
        <b-button class="revoke-card-button" v-hotkey="keymap" v-on:click="revokeYellowCard">-</b-button>
        <b-button class="add-card-button" v-hotkey="keymap" v-on:click="addYellowCard">+</b-button>

        <br>
        Yellow card times:
        <EditableLabelDuration
                v-bind:key="time"
                v-for="(time, index) in yellowCardTimes"
                :value="time"
                :callback="(v) => updateCardTime(v, index)"/>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamCards",
        components: {EditableLabelDuration, EditableLabelNumber},
        props: {
            yellowCards: Number,
            redCards: Number,
            yellowCardTimes: Array,
            teamColor: String
        },
        methods: {
            addYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'add'}})
            },
            revokeYellowCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'yellow', 'operation': 'revoke'}})
            },
            addRedCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'red', 'operation': 'add'}})
            },
            revokeRedCard: function () {
                this.$socket.sendObj({'card': {'forTeam': this.teamColor, 'cardType': 'red', 'operation': 'revoke'}})
            },
            updateYellowCards: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'modifyType': 'yellowCards',
                        'valueInt': Number(v)
                    }
                })
            },
            updateRedCards: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'modifyType': 'redCards',
                        'valueInt': Number(v)
                    }
                })
            },
            updateCardTime: function (v, index) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'modifyType': 'yellowCardTime',
                        'valueInt': index,
                        'valueStr': v
                    }
                })
            },
        },
        computed: {
            keymap() {
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

    .add-card-button {
        width: 5em;
    }

    .revoke-card-button {
        width: 2em;
    }
</style>