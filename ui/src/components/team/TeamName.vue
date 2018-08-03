<template>
    <div>
        <EditableLabelSelect
                label="Name: "
                :value="team.name"
                :options="teams"
                :callback="updateTeamName"
        />
    </div>

</template>

<script>
    import EditableLabelSelect from "../common/EditableLabelSelect";

    export const TEAMS = [
        "",
        "AIS",
        "AMC",
        "CMμs",
        "ER-Force",
        "Immortals",
        "KIKS",
        "MCT Susano Logics",
        "MRL",
        "NEUIslanders",
        "OMID",
        "Parsian",
        "RoboDragons",
        "RoboFEI",
        "RoboIME",
        "RoboJackets",
        "RoboTeam Twente",
        "SRC",
        "SSH",
        "STOx’s",
        "TIGERs Mannheim",
        "ULtron",
        "UMass Minutebots",
        "UBC Thunderbots",
        "ZJUNlict"];

    export default {
        name: "TeamName",
        components: {EditableLabelSelect},
        props: {
            teamColor: String
        },
        computed: {
            team: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            teams: function () {
                return TEAMS
            }
        },
        methods: {
            updateTeamName: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'teamName': v
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>