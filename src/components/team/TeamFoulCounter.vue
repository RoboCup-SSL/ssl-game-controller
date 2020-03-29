<template>
    <div>
        <a>{{teamState.fouls.length}}</a>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamFoulCounter",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
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
