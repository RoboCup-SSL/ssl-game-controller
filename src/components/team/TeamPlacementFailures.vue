<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="teamState.ballPlacementFailures"
            :callback="updateBallPlacementFailures"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamPlacementFailures",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        },
        methods: {
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
