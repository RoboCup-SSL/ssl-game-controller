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

            <label>Match type: </label>
            <EditableLabelSelect
                :edit-mode="{active: true}"
                :value="matchType"
                :options="matchTypes"
                :callback="updateMatchType"
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
    import {resetMatch, submitChange} from "@/submit";
    import {TEAM_YELLOW} from "@/refereeState";
    import EditableLabelSelect from "@/components/common/EditableLabelSelect";

    export default {
        name: "MatchSettings",
        components: {DualSwitch, TeamSelection, EditableLabelSelect},
        data() {
            return {
                kickoffTeamSelectionModel: {
                    team: null,
                }
            }
        },
        methods: {
            resetMatch: function () {
                resetMatch();
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
                this.$bvModal.msgBoxConfirm('Are sure to start a new game and reset the whole state? A backup file of the current state will be created.', {
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
                            this.$root.$emit('bv::hide::modal', 'settings-modal');
                        }
                    })
                    .catch(err => {
                        console.log('Error in confirm dialog: ' + err);
                    })
            },
            updateMatchType(matchType) {
                submitChange({updateConfig: {matchType: matchType}});
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
            matchType() {
                return this.state.matchType;
            },
            matchTypes() {
                return ["UNKNOWN_MATCH", "GROUP_PHASE", "ELIMINATION_PHASE", "FRIENDLY"];
            }
        }
    }
</script>

<style scoped>
label {
    margin-right: 0.5em;
    margin-left: 1em;
}
</style>
