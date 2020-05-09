<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="teamState.challengeFlags"
            :callback="updateChallengeFlags"
            :min="0"
            :max="9"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import {submitChange} from "../../submit";

    export default {
        name: "TeamChallengeFlags",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            }
        },
        methods: {
            updateChallengeFlags: function (v) {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        challengeFlags: Number(v)
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>
