<template>
    <div>
        <div>
            <EditableLabelNumber
                    :label="'Bot collisions: '"
                    :value="teamState.botCollisions"
                    :callback="updateBotCollisions"
                    :min="0"
                    :max="99"/>
        </div>
        <div>
            <EditableLabelNumber
                    :label="'Ball-placement failures: '"
                    :value="teamState.ballPlacementFailures"
                    :callback="updateBallPlacementFailures"
                    :min="0"
                    :max="99"/>
        </div>
        <div>
            <EditableLabelNumber
                    :label="'Bot-speed infringements: '"
                    :value="teamState.botSpeedInfringements"
                    :callback="updateBotSpeedInfringements"
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
            updateBotCollisions: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'botCollisions': Number(v)
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
            updateBotSpeedInfringements: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'botSpeedInfringements': Number(v)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>