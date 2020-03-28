<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="team.timeoutsLeft"
            :callback="updateTimeoutsLeft"
            :min="0"
            :max="4"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamTimeouts",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateTimeoutsLeft: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'timeoutsLeft': Number(v)
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
