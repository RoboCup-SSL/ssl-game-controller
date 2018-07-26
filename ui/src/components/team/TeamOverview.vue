<template>
    <div class="team-overview">
        <p>Team {{teamColor}}</p>
        <TeamScore :team-color="teamColor"
                   :score="team.goals"/>
        <TeamGoalie :goalie="team.goalie"
                    :team-color="teamColor"/>
        <TeamTimeouts :timeouts-left="team.timeoutsLeft"
                      :timeout-time-left="team.timeoutTimeLeft"/>
        <TeamCards :team-color="teamColor"
                   :yellow-cards="team.yellowCards"
                   :red-cards="team.redCards"
                   :yellow-card-times="team.yellowCardTimes"/>
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
        props: {
            teamColor: String
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        }
    }
</script>

<style scoped>

</style>