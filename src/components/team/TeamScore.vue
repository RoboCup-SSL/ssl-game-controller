<template>
    <EditableLabelNumber
            :value="goals"
            :callback="updateGoals"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamScore",
        components: {EditableLabelNumber},
        props: {
            teamColor: String
        },
        methods: {
            updateGoals: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'goals': Number(v)
                    }
                })
            }
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            goals() {
                return this.team.goals;
            }
        }
    }
</script>

<style scoped>

</style>
