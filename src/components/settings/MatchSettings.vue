<template>
    <div class="game-controller-container">
        <p>
            <label>First kickoff team: </label>
            <DualSwitch
                    left-label="Yellow"
                    left-value="YELLOW"
                    right-label="Blue"
                    right-value="BLUE"
                    :callback="switchFirstKickoffTeam"
                    :selected-value="firstKickoffTeam"
            />
        </p>

        <b-button v-b-tooltip.hover.d500 title="Switch the colors of the teams, keep everything else"
                  v-on:click="switchColor"
                  :disabled="forbidMatchControls">
            Switch colors
        </b-button>

        <b-button v-b-tooltip.hover.d500 title="Switch the playing half (the goal) of the teams"
                  v-on:click="switchSides"
                  :disabled="forbidMatchControls">
            Switch sides
        </b-button>

        <DualSwitch
                left-label="Div A"
                left-value="DIV_A"
                right-label="Div B"
                right-value="DIV_B"
                :callback="switchDivision"
                :selected-value="division"
                :disabled="forbidMatchControls"
        />

        <b-button v-b-tooltip.hover.d500 title="Start a new match by resetting everything"
                  v-on:click="showMsgBoxConfirmResetGame">
            Start new game
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../common/TeamSelection";
    import DualSwitch from "../common/DualSwitch";
    import {submitChange} from "../../submit";
    import {TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "MatchSettings",
        components: {DualSwitch, TeamSelection},
        data() {
            return {
                kickoffTeamSelectionModel: {
                    team: null,
                }
            }
        },
        methods: {
            resetMatch: function () {
                // TODO
            },
            switchColor: function () {
                submitChange({switchColors: {}});
            },
            switchSides: function () {
                submitChange({updateTeamState: {forTeam: TEAM_YELLOW, onPositiveHalf: !this.$store.state.matchState.teamState[TEAM_YELLOW].onPositiveHalf}});
            },
            switchDivision(div) {
                submitChange({updateConfig: {division: div}});
            },
            switchFirstKickoffTeam(team) {
                submitChange({updateConfig: {firstKickoffTeam: team}});
            },
            showMsgBoxConfirmResetGame() {
                this.$bvModal.msgBoxConfirm('Are sure to start a new game and reset the whole state? This can NOT be reverted (easily).', {
                    title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if (value) {
                            this.resetMatch();
                        }
                    })
                    .catch(err => {
                        console.log('Error in confirm dialog: ' + err);
                    })
            }
        },
        computed: {
            state() {
                return this.$store.state.matchState
            },
            firstKickoffTeam() {
                return this.$store.state.matchState.firstKickoffTeam;
            },
            division() {
                return this.$store.state.matchState.division;
            },
            halted() {
                return this.state.command.type === 'HALT';
            },
            stopped() {
                return this.state.command.type === 'STOP';
            },
            forbidMatchControls() {
                return !this.stopped && !this.halted;
            },
        }
    }
</script>

<style scoped>
</style>
