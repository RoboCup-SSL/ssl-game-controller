<template>
    <span>
        <EditableLabelNumber
                label="Yellow cards: "
                :value="yellowCards"
                :callback="updateYellowCards"
                :min="0"
                :max="99"/>

        <span>
            (
            <span v-b-tooltip.hover
                  title="Active yellow cards">{{yellowCardTimes.length}}</span>
            <span v-b-toggle.collapseDurations v-show="yellowCardTimes.length>0">
                |
                <span v-b-tooltip.hover
                      title="Next yellow card due, click to show all"
                      v-format-ns-duration="yellowCardTimes[0]"></span>
            </span>
            )
        </span>

        <b-collapse id="collapseDurations" class="mt-2">
            <EditableLabelDuration
                    class="editable-label"
                    v-bind:key="time"
                    v-for="(time, index) in yellowCardTimes"
                    :value="time"
                    :callback="(v) => updateCardTime(v, index)"/>
        </b-collapse>
    </span>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamYellowCards",
        components: {EditableLabelDuration, EditableLabelNumber},
        props: {
            yellowCards: Number,
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
    .editable-label {
        margin-left: 0.15em;
        margin-right: 0.15em;
    }
</style>