<template>
    <div>
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
            <span v-show="yellowCardTimes.length>0">
                |
                <span v-b-tooltip.hover
                      title="Next yellow card due"
                      v-format-ns-duration="yellowCardTimes[0]"></span>
            </span>
            )
        </span>

        <a class="btn-edit"
           v-if="!showAllCards"
           @click="showAllCards=!showAllCards">
            <font-awesome-icon icon="caret-square-down"/>
        </a>
        <a class="btn-edit"
           v-if="showAllCards"
           @click="showAllCards=!showAllCards">
            <font-awesome-icon icon="caret-square-up"/>
        </a>

        <div class="card-times-container" v-if="showAllCards">
            <label class="lbl-times"> Times: </label>
            <EditableLabelDuration
                    class="editable-label"
                    v-bind:key="cardId"
                    v-for="(cardTime, cardId) in yellowCardTimes"
                    :value="cardTime"
                    :callback="(v) => updateCardTime(v, cardId)"/>
        </div>
    </div>
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
        data() {
            return {
                showAllCards: false
            }
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
    .lbl-times {
        margin-right: 0.3em;
    }
    .card-times-container {
        margin-left: 0.5em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 300px;
    }
</style>