<template>
    <div class="team-overview">
        <p>Team {{teamColor}}</p>
        <TeamScore v-bind:score="team.score"/>
        <TeamGoalie v-bind:goalie="team.goalie"/>
        <TeamTimeouts v-bind:timeouts-left="team.timeoutsLeft"
                      v-bind:timeout-time-left="team.timeoutTimeLeft"/>
        <TeamCards v-bind:team-color="teamColor"
                   v-bind:yellow-cards="team.yellowCards"
                   v-bind:red-cards="team.redCards"
                   v-bind:yellow-card-times="team.yellowCardTimes"/>
    </div>
</template>

<script>
    import TeamScore from "./TeamScore";
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalie from "./TeamGoalie";
    import TeamCards from "./TeamCards";

    export default {
        name: "TeamOverview",
        components: {TeamGoalie, TeamTimeouts, TeamScore, TeamCards},
        props: {'teamColor': ''},
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        }
    }
</script>

<style scoped>

</style>