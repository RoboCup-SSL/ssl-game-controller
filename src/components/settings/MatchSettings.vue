<template>
    <div class="view">
        <p>
            <label>First kickoff team: </label>
            <DualSwitch
                    left-label="Yellow"
                    left-value="Yellow"
                    right-label="Blue"
                    right-value="Blue"
                    :callback="switchFirstKickoffTeam"
                    :selected-value="firstKickoffTeam"
            />
        </p>

        <b-button v-b-tooltip.hover title="Switch the colors of the teams, keep everything else"
                  v-on:click="switchColor"
                  :disabled="forbidMatchControls">
            Switch colors
        </b-button>

        <b-button v-b-tooltip.hover title="Switch the playing half (the goal) of the teams"
                  v-on:click="switchSides"
                  :disabled="forbidMatchControls">
            Switch sides
        </b-button>

        <DualSwitch
                left-label="Div A"
                left-value="DivA"
                right-label="Div B"
                right-value="DivB"
                :callback="switchDivision"
                :selected-value="division"
                :disabled="forbidMatchControls"
        />

        <b-button v-b-tooltip.hover title="Start a new match by resetting everything"
                  v-on:click="showMsgBoxConfirmResetGame">
            Start new game
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../common/TeamSelection";
    import DualSwitch from "../common/DualSwitch";
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
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'resetMatch'}
                })
            },
            switchColor: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'switchColor'}
                })
            },
            switchSides: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'switchSides'}
                })
            },
            switchDivision(div) {
                this.$socket.sendObj({
                    'modify': {'division': div}
                })
            },
            switchFirstKickoffTeam(team) {
                this.$socket.sendObj({
                    'modify': {'firstKickoffTeam': team}
                })
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
                return this.$store.state.refBoxState
            },
            firstKickoffTeam() {
                return this.$store.state.gcState.firstKickoffTeam;
            },
            division() {
                return this.$store.state.gcState.division;
            },
            halted() {
                return this.state.command === 'halt';
            },
            stopped() {
                return this.state.command === 'stop';
            },
            forbidMatchControls() {
                return !this.stopped && !this.halted;
            },
        }
    }
</script>

<style scoped>
    button {
        margin-right: 0.25em;
        margin-left: 0.25em;
    }
</style>
