<template>
    <div>
        <div class="btn-group">
            <Settings/>
        </div>

        <div class="btn-group-toggle btn-group" v-hotkey="keymapToggleAutoRef">
            <label v-help-text="'Enable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-active': autoContinue, 'btn-passive': !autoContinue}"
                   @click="setAutoContinue(true)">
                Auto
            </label>
            <label v-help-text="'Disable automatic continuation based on game events (' + Object.keys(keymapToggleAutoRef)[0] + ')'"
                   :class="{btn:true, 'btn-active': !autoContinue, 'btn-passive': autoContinue}"
                   @click="setAutoContinue(false)">
                Manual
            </label>
        </div>

        <b-button v-help-text="'Proceed to the next stage'"
                  v-on:click="nextStage"
                  :disabled="forbidMatchControls || noNextStage || preStage">
            Proceed to {{nextStageText}}
        </b-button>

        <b-button v-help-text="'Finish the game'"
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
    import {getNextStage, stageNames, isPreStage} from "@/refereeState";
    import NewEvent from "../create-event/NewEvent";
    import {setAutoContinue, submitChange} from "@/submit";

    export default {
        name: "MatchSettingsBar",
        components: {NewEvent, Settings},
        methods: {
            nextStage: function () {
                submitChange({
                    changeStageChange: {
                        newStage: getNextStage(this.$store.state.matchState.stage)
                    }
                });
            },
            endGame: function () {
                submitChange({
                    changeStageChange: {
                        newStage: 'POST_GAME'
                    }
                });
            },
            setAutoContinue(enabled) {
                setAutoContinue(enabled);
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
                return this.$store.state.gcState.autoContinue;
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
                return this.halted;
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
