<template>
    <span>
        <label v-show="teamState.onPositiveHalf">On positive half</label>
        <label v-show="!teamState.onPositiveHalf">On negative half</label>
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
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>