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
    import {submitChange} from "../../submit";

    export default {
        name: "TeamGoalkeeper",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateGoalkeeper: function (v) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        goalkeeper: v
                    }
                });
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
