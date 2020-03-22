<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="team.yellowCards.length"
            :callback="updateYellowCards"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamYellowCards",
        components: {EditableLabelNumber},
        props: {
            teamColor: Number,
            editMode: Object,
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
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
        }
    }
</script>

<style scoped>
</style>
