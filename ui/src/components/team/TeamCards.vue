<template>
    <div class="team-cards">
        <EditableLabelNumber
                label="Red cards: "
                :value="redCards"
                :callback="updateRedCards"
                :min="0"
                :max="99"/>

        <EditableLabelNumber
                label="Yellow cards: "
                :value="yellowCards"
                :callback="updateYellowCards"
                :min="0"
                :max="99"/>

        Yellow card times: <span v-if="yellowCardTimes.length===0">None</span>
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
            updateYellowCards: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'yellowCards': Number(v)
                    }
                })
            },
            updateRedCards: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'redCards': Number(v)
                    }
                })
            },
            updateCardTime: function (v, index) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'yellowCardTime': {'cardID': index, 'duration': v}
                    }
                })
            },
        },
    }
</script>

<style scoped>
</style>