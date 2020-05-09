<template>
    <div class="game-controller-view">
        <h2>Team Overview</h2>
        <hr>
        <table>
            <tr>
                <th class="team-yellow">{{teamYellow.name}}</th>
                <th>
                    <a v-b-tooltip.hover.d500
                       :title="editMode.active ? 'Stop editing' : 'Start editing'"
                       class="btn-edit"
                       v-on:click="editMode.active=!editMode.active">
                        <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
                    </a>
                </th>
                <th class="team-blue">{{teamBlue.name}}</th>
            </tr>
            <tr>
                <td>
                    <TeamGoalkeeper :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Goal Keeper</td>
                <td>
                    <TeamGoalkeeper :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamTimeouts :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                    <br/>
                    <TeamTimeoutTime :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Timeouts left</td>
                <td>
                    <TeamTimeouts :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                    <br/>
                    <TeamTimeoutTime :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamTimeoutRequest :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Timeout Request</td>
                <td>
                    <TeamTimeoutRequest :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamRedCards :team-color="TEAM_YELLOW"/>
                    <TeamRedCardsEdit :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Red Cards</td>
                <td>
                    <TeamRedCards :team-color="TEAM_BLUE"/>
                    <TeamRedCardsEdit :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamYellowCards :team-color="TEAM_YELLOW"/>
                    <TeamYellowCardsEdit :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Yellow Cards</td>
                <td>
                    <TeamYellowCards :team-color="TEAM_BLUE"/>
                    <TeamYellowCardsEdit :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamYellowCardsActive :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Active Cards</td>
                <td>
                    <TeamYellowCardsActive :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamYellowCardNextDue :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">
                    Next due
                </td>
                <td>
                    <TeamYellowCardNextDue :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamFouls :team-color="TEAM_YELLOW"/>
                    <TeamFoulsEdit :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Fouls</td>
                <td>
                    <TeamFouls :team-color="TEAM_BLUE"/>
                    <TeamFoulsEdit :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamPlacementFailures :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Placement Failures</td>
                <td>
                    <TeamPlacementFailures :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamBotSubstitution :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Bot Substitution</td>
                <td>
                    <TeamBotSubstitution :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>{{teamYellow.maxAllowedBots}}</td>
                <td class="label-column">Max allowed Bots</td>
                <td>{{teamBlue.maxAllowedBots}}</td>
            </tr>
            <tr>
                <td>
                    <TeamChallengeFlags :edit-mode="editMode" :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Challenge flags</td>
                <td>
                    <TeamChallengeFlags :edit-mode="editMode" :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamConnection :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Connected</td>
                <td>
                    <TeamConnection :team-color="TEAM_BLUE"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamRemoteControlConnection :team-color="TEAM_YELLOW"/>
                </td>
                <td class="label-column">Remote Controlled</td>
                <td>
                    <TeamRemoteControlConnection :team-color="TEAM_BLUE"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import TeamTimeouts from "./TeamTimeouts";
    import TeamGoalkeeper from "./TeamGoalkeeper";
    import TeamYellowCards from "./TeamYellowCards";
    import TeamRedCards from "./TeamRedCards";
    import TeamBotSubstitution from "./TeamBotSubstitution";
    import TeamConnection from "./TeamConnection";
    import TeamFouls from "./TeamFouls";
    import TeamPlacementFailures from "./TeamPlacementFailures";
    import TeamTimeoutTime from "./TeamTimeoutTime";
    import TeamYellowCardNextDue from "./TeamYellowCardNextDue";
    import TeamYellowCardsActive from "./TeamYellowCardsActive";
    import {TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";
    import TeamYellowCardsEdit from "./TeamYellowCardsEdit";
    import TeamRedCardsEdit from "./TeamRedCardsEdit";
    import TeamFoulsEdit from "./TeamFoulsEdit";
    import TeamRemoteControlConnection from "./TeamRemoteControlConnection";
    import TeamTimeoutRequest from "./TeamTimeoutRequest";
    import TeamChallengeFlags from "./TeamChallengeFlags";

    export default {
        name: "TeamOverviewView",
        components: {
            TeamChallengeFlags,
            TeamTimeoutRequest,
            TeamRemoteControlConnection,
            TeamFoulsEdit,
            TeamRedCardsEdit,
            TeamYellowCardsActive,
            TeamTimeoutTime,
            TeamPlacementFailures,
            TeamFouls,
            TeamConnection,
            TeamBotSubstitution,
            TeamRedCards,
            TeamYellowCards,
            TeamGoalkeeper,
            TeamTimeouts,
            TeamYellowCardNextDue,
            TeamYellowCardsEdit,
        },
        data() {
            return {
                showAllCards: false,
                editMode: {
                    active: false,
                },
                TEAM_YELLOW: TEAM_YELLOW,
                TEAM_BLUE: TEAM_BLUE
            }
        },
        computed: {
            teamYellow() {
                return this.$store.state.matchState.teamState[TEAM_YELLOW];
            },
            teamBlue() {
                return this.$store.state.matchState.teamState[TEAM_BLUE];
            },
        }
    }
</script>

<style scoped>
    .label-column {
        font-weight: bold;
    }

    td {
        padding: 0.5em;
        width: 7em;
    }

    table {
        border-collapse: collapse;
    }

    table td, table th {
        border: 1px solid black;
    }

    table tr:first-child th {
        border-top: 0;
    }

    table tr:last-child td {
        border-bottom: 0;
    }

    table tr td:first-child,
    table tr th:first-child {
        border-left: 0;
    }

    table tr td:last-child,
    table tr th:last-child {
        border-right: 0;
    }
</style>
