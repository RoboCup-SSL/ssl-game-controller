<template>
    <div>
        <div class="content">
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
            <div>
                <TeamCounters
                        :team-color="teamColor"/>
            </div>
            <div>
                <TeamBallPlacement
                        :team-color="teamColor"/>
            </div>
            <div>
                Max <b>{{maxAllowedBots}}</b> bots allowed on the field
            </div>
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
    import TeamCounters from "./TeamCounters";
    import TeamBallPlacement from "./TeamBallPlacement";

    export default {
        name: "TeamOverview",
        components: {
            TeamBallPlacement,
            TeamCounters,
            TeamRedCards,
            TeamYellowCards,
            TeamName,
            TeamHalf,
            EditableLabelText,
            TeamGoalie,
            TeamTimeouts,
            TeamScore
        },
        props: {
            teamColor: String
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            maxAllowedBots() {
                return this.team.maxAllowedBots;
            }
        }
    }
</script>

<style scoped>
    .content {
        text-align: left;
    }
</style>