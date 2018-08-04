<template>
    <div>
        <span v-show="teamState.onPositiveHalf">On positive half</span>
        <span v-show="!teamState.onPositiveHalf">On negative half</span>
    </div>
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