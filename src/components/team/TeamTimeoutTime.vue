<template>
    <EditableLabelDuration
            :edit-mode="editMode"
            :value="team.timeoutTimeLeft"
            :callback="updateTimeoutTimeLeft"/>
</template>

<script>
    import EditableLabelDuration from "../common/EditableLabelDuration";
    import {submitChange} from "../../submit";

    export default {
        name: "TeamTimeoutTime",
        components: {EditableLabelDuration},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateTimeoutTimeLeft: function (v) {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        timeoutTimeLeft: v
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
