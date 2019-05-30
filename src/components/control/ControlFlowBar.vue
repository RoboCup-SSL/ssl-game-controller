<template>
    <div>
        <span v-b-tooltip.hover
              :title="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
            <b-button v-hotkey="keymapHalt"
                      ref="btnHalt"
                      v-on:click="send('halt')"
                      v-bind:disabled="halted">
                Halt
            </b-button>
        </span>

        <span v-b-tooltip.hover
              :title="'Continue based on last game event (' + Object.keys(keymapContinue)[0] + ')'">
            <b-button v-hotkey="keymapContinue"
                      ref="btnContinue"
                      v-on:click="triggerContinue"
                      v-bind:disabled="!continuePossible">
                Continue
                <span v-if="state.nextCommand !== ''">with</span>
                <span :class="{'team-blue': state.nextCommandFor === 'Blue', 'team-yellow': state.nextCommandFor === 'Yellow'}">
                    {{state.nextCommand}}
                </span>
            </b-button>
        </span>
    </div>
</template>

<script>
    import {isNonPausedStage, isPreStage} from "../../refereeState";

    export default {
        name: "ControlFlowBar",
        methods: {
            send: function (command) {
                this.$socket.sendObj({command: {commandType: command}})
            },
            triggerContinue() {
                this.$socket.sendObj({trigger: {triggerType: 'continue'}})
            },
        },
        computed: {
            keymapHalt() {
                return {
                    'esc': () => {
                        if (!this.$refs.btnHalt.disabled) {
                            this.send('halt')
                        }
                    }
                }
            },
            keymapContinue() {
                return {
                    'ctrl+alt+space': () => {
                        if (!this.$refs.btnContinue.disabled) {
                            this.triggerContinue()
                        }
                    }
                }
            },
            state() {
                return this.$store.state.refBoxState
            },
            halted() {
                return this.state.command === 'halt';
            },
            continuePossible() {
                return this.halted || this.state.nextCommand !== '';
            },
            stopAllowed() {
                return isNonPausedStage(this.$store.state.refBoxState)
                    || isPreStage(this.$store.state.refBoxState);
            },
        }
    }
</script>

<style scoped>
</style>
