<template>
    <span>
        <a>{{team.yellowCards.length}}</a>
    </span>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamYellowCards",
        components: {EditableLabelNumber},
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
