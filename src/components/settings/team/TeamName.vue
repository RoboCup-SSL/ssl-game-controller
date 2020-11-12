<template>
    <EditableLabelSelect
            :edit-mode="editMode"
            :value="team.name"
            :options="teams"
            :callback="updateTeamName"
    />
</template>

<script>
    import EditableLabelSelect from "../../common/EditableLabelSelect";
    import {submitChange} from "@/submit";

    export const TEAMS = [
    ];

    export default {
        name: "TeamName",
        components: {EditableLabelSelect},
        props: {
            teamColor: String,
            editMode: Object,
        },
        computed: {
            team: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            teams: function () {
                return this.$store.state.config.teams;
            }
        },
        methods: {
            updateTeamName: function (v) {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        teamName: v
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
