<template>
    <div>
        <span v-b-tooltip.hover
              title="Active yellow cards">
            {{team.yellowCardTimes.length}}
        </span>
        |
        <span v-b-tooltip.hover
              title="Next yellow card due"
              v-format-ns-duration="latestCardTime">
        </span>
    </div>
</template>

<script>
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamYellowCardsActive",
        components: {EditableLabelDuration},
        props: {
            teamColor: String
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
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            latestCardTime() {
                if (this.team.yellowCardTimes.length > 0) {
                    return this.team.yellowCardTimes[0];
                }
                return 0;
            }
        }
    }
</script>

<style scoped>
</style>
