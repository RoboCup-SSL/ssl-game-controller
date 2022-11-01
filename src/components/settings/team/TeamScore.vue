<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="goals"
            :callback="updateGoals"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../../common/EditableLabelNumber";
    import {submitChange} from "../../../submit";

    export default {
        name: "TeamScore",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateGoals: function (v) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        goals: Number(v)
                    }
                });
            }
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            goals() {
                return this.team.goals;
            }
        }
    }
</script>

<style scoped>

</style>
