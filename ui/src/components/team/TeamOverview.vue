<template>
    <div class="team-overview">
        <h2> Team {{teamColor}}</h2>
        <TeamName
                :team-color="teamColor"/>
        <TeamScore
                :team-color="teamColor"
                :score="team.goals"
        />
        <TeamGoalie
                :team-color="teamColor"
                :goalie="team.goalie"
        />
        <TeamTimeouts
                :team-color="teamColor"
                :timeouts-left="team.timeoutsLeft"
                :timeout-time-left="team.timeoutTimeLeft"
        />
        <TeamCards
                :team-color="teamColor"
                :yellow-cards="team.yellowCards"
                :red-cards="team.redCards"
                :yellow-card-times="team.yellowCardTimes"
        />
        <TeamHalf
                :team-color="teamColor"
        />
    </div>
</template>

<script>
    import TeamScore from "./TeamScore";
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalie from "./TeamGoalie";
    import TeamCards from "./TeamCards";
    import EditableLabelText from "../common/EditableLabelText";
    import TeamHalf from "./TeamHalf";
    import TeamName from "./TeamName";

    export default {
        name: "TeamOverview",
        components: {TeamName, TeamHalf, EditableLabelText, TeamGoalie, TeamTimeouts, TeamScore, TeamCards},
        props: {
            teamColor: String
        },
        computed: {
            team: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
        }
    }
</script>

<style scoped>
    .team-overview {
        margin: 1em;
    }

</style>