<template>
    <div>
        <table>
            <tr>
                <th class="team-yellow">{{teamYellow.name}}</th>
                <th>
                    <a v-b-tooltip.hover
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
                    <TeamGoalkeeper :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>Goal Keeper</td>
                <td>
                    <TeamGoalkeeper :edit-mode="editMode" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamTimeouts :edit-mode="editMode" team-color="Yellow"/>
                    |
                    <TeamTimeoutTime :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>Timeouts left</td>
                <td>
                    <TeamTimeouts :edit-mode="editMode" team-color="Blue"/>
                    |
                    <TeamTimeoutTime :edit-mode="editMode" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamYellowCards :edit-mode="editMode" team-color="Yellow"/>
                    |
                    <TeamRedCards :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>Yellow / Red Cards</td>
                <td>
                    <TeamYellowCards :edit-mode="editMode" team-color="Blue"/>
                    |
                    <TeamRedCards :edit-mode="editMode" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamYellowCardsActive :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>
                    Active Yellow Cards
                </td>
                <td>
                    <TeamYellowCardsActive :edit-mode="editMode" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamFoulCounter :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>Foul Counter</td>
                <td>
                    <TeamFoulCounter :edit-mode="editMode" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamPlacementFailures :edit-mode="editMode" team-color="Yellow"/>
                </td>
                <td>Placement Failures</td>
                <td>
                    <TeamPlacementFailures :edit-mode="editMode" team-color="Yellow"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamBotSubstitution team-color="Yellow"/>
                </td>
                <td>Bot Substitution</td>
                <td>
                    <TeamBotSubstitution team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>{{teamYellow.maxAllowedBots}}</td>
                <td>Max allowed Bots</td>
                <td>{{teamBlue.maxAllowedBots}}</td>
            </tr>
            <tr>
                <td>
                    <TeamConnection team-color="Yellow"/>
                </td>
                <td>Connected</td>
                <td>
                    <TeamConnection team-color="Blue"/>
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
    import TeamFoulCounter from "./TeamFoulCounter";
    import TeamPlacementFailures from "./TeamPlacementFailures";
    import TeamTimeoutTime from "./TeamTimeoutTime";
    import TeamYellowCardTimes from "./TeamYellowCardTimes";
    import TeamYellowCardsActive from "./TeamYellowCardsActive";

    export default {
        name: "TeamOverview",
        components: {
            TeamYellowCardsActive,
            TeamYellowCardTimes,
            TeamTimeoutTime,
            TeamPlacementFailures,
            TeamFoulCounter,
            TeamConnection,
            TeamBotSubstitution,
            TeamRedCards,
            TeamYellowCards,
            TeamGoalkeeper,
            TeamTimeouts,
        },
        data() {
            return {
                showAllCards: false,
                editMode: {
                    active: false,
                }
            }
        },
        computed: {
            teamYellow() {
                return this.$store.state.refBoxState.teamState['Yellow'];
            },
            teamBlue() {
                return this.$store.state.refBoxState.teamState['Blue'];
            },
        }
    }
</script>

<style scoped>
</style>
