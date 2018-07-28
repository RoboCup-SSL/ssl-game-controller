<template>
    <div class="team-overview">
        <h2> Team {{teamColor}}</h2>
        <EditableLabelText
                label="Name: "
                :value="team.name"
                :callback="updateTeamName"/>
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
    </div>
</template>

<script>
    import TeamScore from "./TeamScore";
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalie from "./TeamGoalie";
    import TeamCards from "./TeamCards";
    import EditableLabelText from "../common/EditableLabelText";

    export default {
        name: "TeamOverview",
        components: {EditableLabelText, TeamGoalie, TeamTimeouts, TeamScore, TeamCards},
        props: {
            teamColor: String
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        },
        methods: {
            updateTeamName: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'modifyType': 'teamName',
                        'valueStr': v
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .team-overview {
        margin: 1em;
    }

</style>