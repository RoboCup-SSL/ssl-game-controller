<template>
    <span>
        <a>{{teamState.fouls.length}}</a>
    </span>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamFouls",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            }
        }
    }
</script>

<style scoped>

</style>
