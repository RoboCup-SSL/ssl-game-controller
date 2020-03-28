<template>
    <div class="card-times-container">
        <EditableLabelDuration
                :edit-mode="editMode"
                class="editable-label"
                v-bind:key="cardId"
                v-for="(card, cardId) in team.yellowCards"
                :value="card.remainingTime"
                :callback="(v) => updateCardTime(v, cardId)"/>
    </div>
</template>

<script>
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamYellowCardTimes",
        components: {EditableLabelDuration},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateCardTime: function (v, index) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'yellowCardTime': {'cardID': index, 'duration': v}
                    }
                })
            },
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
        }
    }
</script>

<style scoped>
    .card-times-container {
        display: flex;
        flex-direction: column;
    }
</style>
