<template>
    <div class="game-controller-view">
        <h2>Manual Control</h2>
        <hr>
        <table>
            <tr>
                <td colspan="2">
                    <ManualControlCommon/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td class="team-yellow">
                    {{teamStateYellow.name}}
                </td>
                <td class="team-blue">
                    {{teamStateBlue.name}}
                </td>
            </tr>
            <tr>
                <td>
                    <ManualControlTeamMatchCommands :team-color="TEAM_YELLOW"/>
                </td>
                <td>
                    <ManualControlTeamMatchCommands :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td>
                    <ManualControlTeam :team-color="TEAM_YELLOW"/>
                </td>
                <td>
                    <ManualControlTeam :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <b-btn v-b-modal.place-ball-modal variant="secondary">Place ball</b-btn>
                </td>
            </tr>
        </table>

        <b-modal id="place-ball-modal"
                 title="Place ball"
                 :lazy="true">
            <PlaceBall/>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </div>
</template>

<script>
    import ManualControlCommon from "./ManualControlCommon";
    import ManualControlTeam from "./ManualControlTeam";
    import ManualControlTeamMatchCommands from "./ManualControlTeamMatchCommands";
    import PlaceBall from "./PlaceBall";
    import {TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "ManualControlView",
        components: {
            PlaceBall,
            ManualControlTeamMatchCommands,
            ManualControlCommon,
            ManualControlTeam
        },
        data() {
            return {
                TEAM_YELLOW: TEAM_YELLOW,
                TEAM_BLUE: TEAM_BLUE
            }
        },
        computed: {
            state() {
                return this.$store.state.matchState
            },
            teamStateYellow() {
                return this.$store.state.matchState.teamState["1"]
            },
            teamStateBlue() {
                return this.$store.state.matchState.teamState["2"]
            },
        }
    }
</script>

<style scoped>
</style>

<style>
    .manual-control-button {
        width: 90%;
    }
</style>
