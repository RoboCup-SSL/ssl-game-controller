<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="team.timeoutsLeft"
            :callback="updateTimeoutsLeft"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import {submitChange} from "../../submit";

    export default {
        name: "TeamTimeouts",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateTimeoutsLeft: function (v) {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        timeoutsLeft: Number(v)
                    }
                });
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
