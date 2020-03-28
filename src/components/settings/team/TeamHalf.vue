<template>
    <span>
        <label v-show="teamState.onPositiveHalf">Goal is on positive half.</label>
        <label v-show="!teamState.onPositiveHalf">Goal is on negative half.</label>
    </span>
</template>

<script>
    export default {
        name: "TeamHalf",
        props: {
            teamColor: String
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