<template>
    <div class="team-overview">
        <p>Team {{teamColor}}</p>
        <div>Score: {{score}}</div>
        <div>Yellow Cards: {{yellowCards}}</div>
        <button v-on:click="clickButton">Yellow Card</button>
    </div>
</template>

<script>
    export default {
        name: "TeamOverview",
        props: {'teamColor': ''},
        computed: {
            score() {
                return this.$store.state.refBoxState.team_state[this.teamColor].score
            },
            yellowCards() {
                return this.$store.state.refBoxState.team_state[this.teamColor].yellow_cards
            }
        },
        methods: {
            clickButton: function () {
                this.$socket.sendObj({'yellow_card': {'for_team': this.teamColor}})
            }
        }
    }
</script>

<style scoped>

</style>