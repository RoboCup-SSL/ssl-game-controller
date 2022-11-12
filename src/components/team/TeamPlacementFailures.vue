<template>
    <EditableLabelNumber
            :class="{highlighted: !teamState.canPlaceBall}"
            :edit-mode="editMode"
            :value="teamState.ballPlacementFailures"
            :callback="updateBallPlacementFailures"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import {submitChange} from "@/submit";

    export default {
        name: "TeamPlacementFailures",
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
            updateBallPlacementFailures: function (v) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        ballPlacementFailures: Number(v)
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .highlighted {
        color: red;
    }
</style>
