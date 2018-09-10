<template>
    <div>
        <div>
            <EditableLabelNumber
                    :label="'Foul Counter: '"
                    :value="teamState.foulCounter"
                    :callback="updateFoulCounter"
                    :min="0"
                    :max="99"/>
        </div>
        <div>
            <EditableLabelNumber
                    :label="'Ball Placement failures: '"
                    :value="teamState.ballPlacementFailures"
                    :callback="updateBallPlacementFailures"
                    :min="0"
                    :max="99"/>
        </div>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamCounters",
        components: {EditableLabelNumber},
        props: {
            teamColor: String
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        },
        methods: {
            updateFoulCounter: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'foulCounter': Number(v)
                    }
                })
            },
            updateBallPlacementFailures: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'ballPlacementFailures': Number(v)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>