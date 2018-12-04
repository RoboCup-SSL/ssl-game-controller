<template>
    <div>
        <h2>{{teamColor}} Team
            <span v-b-tooltip.hover
                  title="Team connected"
                  v-if="team.connected">
                <font-awesome-icon
                        class="fa-xs"
                        icon="signal"/>
            </span>
        </h2>
        <div class="content">
            <div>
                <TeamName
                        :team-color="teamColor"/>
            </div>
            <div>
                <TeamGoalkeeper
                        :team-color="teamColor"
                        :goalkeeper="team.goalkeeper"/>
            </div>
            <div>
                <TeamScore
                        :team-color="teamColor"
                        :score="team.goals"/>
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
                <TeamBotSubstitution
                        :team-color="teamColor"/>
            </div>
            <div>
                <TeamHalf
                        :team-color="teamColor"/>
            </div>
            <div>
                At most <b>{{maxAllowedBots}}</b> bots allowed on the field.
            </div>
        </div>
    </div>
</template>

<script>
    import TeamScore from "./TeamScore";
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalkeeper from "./TeamGoalkeeper";
    import EditableLabelText from "../common/EditableLabelText";
    import TeamHalf from "./TeamHalf";
    import TeamName from "./TeamName";
    import TeamYellowCards from "./TeamYellowCards";
    import TeamRedCards from "./TeamRedCards";
    import TeamCounters from "./TeamCounters";
    import TeamBallPlacement from "./TeamBallPlacement";
    import TeamBotSubstitution from "./TeamBotSubstitution";

    export default {
        name: "TeamOverview",
        components: {
            TeamBotSubstitution,
            TeamBallPlacement,
            TeamCounters,
            TeamRedCards,
            TeamYellowCards,
            TeamName,
            TeamHalf,
            EditableLabelText,
            TeamGoalkeeper,
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