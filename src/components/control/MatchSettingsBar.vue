<template>
    <div>
        <div class="btn-group">
            <Settings/>
        </div>

        <div class="btn-group-toggle btn-group" v-hotkey="keymapToggleAutoRef">
            <label v-b-tooltip.hover.d500
                   :title="'Enable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-active': autoContinue, 'btn-passive': !autoContinue}"
                   @click="setAutoContinue(true)">
                Auto
            </label>
            <label v-b-tooltip.hover.d500
                   :title="'Disable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-active': !autoContinue, 'btn-passive': autoContinue}"
                   @click="setAutoContinue(false)">
                Manual
            </label>
        </div>

        <b-button v-b-tooltip.hover.d500
                  title="Proceed to the next stage"
                  v-on:click="nextStage"
                  :disabled="forbidMatchControls || noNextStage || preStage">
            Proceed to {{nextStageText}}
        </b-button>

        <b-button v-b-tooltip.hover.d500
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
    import {getNextStage, canEndGameFromStage, stageNames, isPreStage} from "@/refereeState";
    import NewEvent from "../create-event/NewEvent";
    import {submitChange} from "@/submit";

    export default {
        name: "MatchSettingsBar",
        components: {NewEvent, Settings},
        methods: {
            nextStage: function () {
                submitChange({
                    changeStage: {
                        newStage: getNextStage(this.$store.state.matchState.stage)
                    }
                });
            },
            endGame: function () {
                submitChange({
                    changeStage: {
                        newStage: 'POST_GAME'
                    }
                });
            },
            setAutoContinue(enabled) {
                submitChange({updateConfig: {autoContinue: enabled}});
            },
        },
        computed: {
            halted() {
                return this.$store.state.matchState.command.type === 'HALT';
            },
            stopped() {
                return this.$store.state.matchState.command.type === 'STOP';
            },
            forbidMatchControls() {
                return !this.stopped && !this.halted;
            },
            noNextStage() {
                return this.$store.state.matchState.stage === 'POST_GAME';
            },
            autoContinue() {
                return this.$store.state.matchState.autoContinue;
            },
            keymapToggleAutoRef() {
                return {
                    'ctrl+alt+numpad 2': () => {
                        this.setAutoContinue(!this.autoContinue)
                    }
                }
            },
            nextStageText() {
                return stageNames[getNextStage(this.$store.state.matchState.stage)];
            },
            showEndGame() {
                return canEndGameFromStage(this.$store.state.matchState);
            },
            preStage() {
                return isPreStage(this.$store.state.matchState);
            },
        }
    }
</script>

<style scoped>

    .btn-active {
        background-color: green;
        border-color: green;
        color: white;
    }

    .btn-passive {
        background-color: red;
        border-color: red;
        color: white;
    }
</style>
