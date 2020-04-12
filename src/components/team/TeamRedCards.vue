<template>
    <span>
        <a>{{team.redCards.length}}</a>
    </span>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamRedCards",
        components: {EditableLabelDuration, EditableLabelNumber},
        props: {
            teamColor: String,
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
