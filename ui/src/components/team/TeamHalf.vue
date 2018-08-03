<template>
    <div>
        <label v-show="teamState.onPositiveHalf">On positive half</label>
        <label v-show="!teamState.onPositiveHalf">On negative half</label>
        <b-button v-on:click="switchHalf">Switch</b-button>
    </div>
</template>

<script>
    export default {
        name: "TeamHalf",
        props: {
            teamColor: String
        },
        methods: {
            switchHalf: function () {
                let currentValue = this.teamState.onPositiveHalf;
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'onPositiveHalf': !currentValue
                    }
                })
            },
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