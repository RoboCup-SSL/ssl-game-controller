<template>
    <div class="team-cards">
        <EditableLabelNumber
                label="Yellow cards: "
                :value="yellowCards"
                :callback="updateYellowCards"
                :min="0"
                :max="99"/>
        <button v-hotkey="keymap" v-on:click="revokeYellowCard" style="width: 2em; margin-right: 0.5em">-</button>
        <button v-hotkey="keymap" v-on:click="addYellowCard" style="width: 5em">+</button>


        <EditableLabelNumber
                label="Red cards: "
                :value="redCards"
                :callback="updateRedCards"
                :min="0"
                :max="99"/>
        <button v-hotkey="keymap" v-on:click="revokeRedCard" style="width: 2em; margin-right: 0.5em">-</button>
        <button v-hotkey="keymap" v-on:click="addRedCard" style="width: 5em">+</button>

        <p>Yellow card times:
            <span v-bind:key="time" v-for="time in yellowCardTimes" v-format-ns-duration style="margin-right: 0.3em">{{time}}</span>
        </p>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamCards",
        components: {EditableLabelNumber},
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

</style>