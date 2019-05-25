<template>
    <div>
        <div class="btn-group">
            <Settings/>
        </div>

        <div class="btn-group-toggle btn-group" v-hotkey="keymapToggleAutoRef">
            <label v-b-tooltip.hover
                   :title="'Enable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-secondary': true, active: autoContinue}"
                   @click="setAutoContinue(true)">
                Auto
            </label>
            <label v-b-tooltip.hover
                   :title="'Disable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-secondary': true, active: !autoContinue}"
                   @click="setAutoContinue(false)">
                Manual
            </label>
        </div>

        <b-button v-b-tooltip.hover
                  title="Proceed to the next stage"
                  v-on:click="nextStage"
                  :disabled="forbidMatchControls || noNextStage">
            Proceed to '{{nextStageText}}'
        </b-button>

        <b-button v-b-tooltip.hover
                  title="Finish the game"
                  v-on:click="endGame"
                  v-if="showEndGame"
                  :disabled="forbidMatchControls || noNextStage">
            End of Game
        </b-button>

        <b-btn v-b-modal.new-event-modal>New Event</b-btn>
        <b-modal id="new-event-modal"
                 title="New Game Event"
                 :lazy="true">
            <NewEvent/>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Settings from "../settings/Settings";
    import {getNextStage, canEndGameFromStage} from "../../refereeState";
    import NewEvent from "../events/NewEvent";

    export default {
        name: "MatchSettingsBar",
        components: {NewEvent, Settings},
        methods: {
            nextStage: function () {
                this.$socket.sendObj({
                    'stage': {'stageOperation': 'next'}
                })
            },
            endGame: function () {
                this.$socket.sendObj({
                    'stage': {'stageOperation': 'endGame'}
                })
            },
            setAutoContinue(enabled) {
                this.$socket.sendObj({
                    'modify': {'autoContinue': enabled}
                })
            },
        },
        computed: {
            state() {
                return this.$store.state.refBoxState
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
            noNextStage() {
                return this.state.stage === 'End of Game';
            },
            autoContinue() {
                return this.state.autoContinue;
            },
            keymapToggleAutoRef() {
                return {
                    'ctrl+alt+numpad 2': () => {
                        this.setAutoContinue(!this.autoContinue)
                    }
                }
            },
            nextStageText() {
                return getNextStage(this.state.stage);
            },
            showEndGame() {
                return canEndGameFromStage(this.state.stage);
            },
        }
    }
</script>

<style scoped>
    button, .btn-group {
        margin-right: 0.5em;
        margin-bottom: 0.5em;
    }
</style>
