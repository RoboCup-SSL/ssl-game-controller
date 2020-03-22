<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            title="The goalkeeper number"
            :value="goalkeeper"
            :callback="updateGoalkeeper"
            :min="0"
            :max="15"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamGoalkeeper",
        components: {EditableLabelNumber},
        props: {
            teamColor: Number,
            editMode: Object,
        },
        methods: {
            updateGoalkeeper: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'goalkeeper': Number(v)
                    }
                })
            },
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            goalkeeper() {
                return this.team.goalkeeper;
            }
        }
    }
</script>

<style scoped>

</style>
