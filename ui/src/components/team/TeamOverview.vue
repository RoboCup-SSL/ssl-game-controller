<template>
    <div class="team-overview">
        <h2 v-b-tooltip.hover title="Edit team data by double-clicking a value"> Team {{teamColor}}</h2>
        <div>
            <TeamName
                    :team-color="teamColor"/>
        </div>
        <div>
            <TeamScore
                    :team-color="teamColor"
                    :score="team.goals"/>
        </div>
        <div>
            <TeamGoalie
                    :team-color="teamColor"
                    :goalie="team.goalie"/>
        </div>
        <div>
            <TeamHalf
                    :team-color="teamColor"/>
        </div>
        <div>
            <TeamTimeouts
                    :team-color="teamColor"
                    :timeouts-left="team.timeoutsLeft"
                    :timeout-time-left="team.timeoutTimeLeft"/>
        </div>
        <div>
            <TeamRedCards
                    :team-color="teamColor"
                    :red-cards="team.redCards"/>
        </div>
        <div>
            <TeamYellowCards
                    :team-color="teamColor"
                    :yellow-cards="team.yellowCards"
                    :yellow-card-times="team.yellowCardTimes"/>
        </div>
    </div>
</template>

<script>
    import TeamScore from "./TeamScore";
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalie from "./TeamGoalie";
    import EditableLabelText from "../common/EditableLabelText";
    import TeamHalf from "./TeamHalf";
    import TeamName from "./TeamName";
    import TeamYellowCards from "./TeamYellowCards";
    import TeamRedCards from "./TeamRedCards";

    export default {
        name: "TeamOverview",
        components: {
            TeamRedCards,
            TeamYellowCards,
            TeamName, TeamHalf, EditableLabelText, TeamGoalie, TeamTimeouts, TeamScore
        },
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
        text-align: left;
    }
</style>