<template>
    <span class="control-general">
        <span v-b-tooltip.hover
              :title="'Immediately stop all robots (' + Object.keys(keymapHalt)[0] + ')'">
            <b-button v-hotkey="keymapHalt"
                      v-on:click="send('halt')"
                      v-bind:disabled="halted">
                Halt
            </b-button>
        </span>
        <span v-b-tooltip.hover
              :title="'Robots have to keep distance to the ball (' + Object.keys(keymapStop)[0] + ')'">
            <b-button v-hotkey="keymapStop"
                      v-on:click="send('stop')"
                      v-bind:disabled="stopped || !inNormalHalf">
                Stop
            </b-button>
        </span>
        <span v-b-tooltip.hover
              :title="'Restart the game in draw situations (' + Object.keys(keymapForceStart)[0] + ')'">
            <b-button v-hotkey="keymapForceStart"
                      v-on:click="send('forceStart')"
                      v-bind:disabled="!stopped || !inNormalHalf">
                Force Start
            </b-button>
        </span>
        <span v-b-tooltip.hover
              :title="'Continue game after a prepare state (' + Object.keys(keymapNormalStart)[0] + ')'">
            <b-button v-hotkey="keymapNormalStart"
                      v-on:click="send('normalStart')"
                      v-bind:disabled="!prepareSth || !inNormalHalf">
                Normal Start
            </b-button>
        </span>
        <span v-b-tooltip.hover
              :title="'Continue based on last game event (' + Object.keys(keymapContinue)[0] + ')'">
            <b-button v-hotkey="keymapContinue"
                      v-on:click="triggerContinue"
                      v-bind:disabled="!gameEventPresent">
                Continue
            </b-button>
        </span>
    </span>
</template>

<script>
    import {isInNormalHalf} from "../../main";

    export default {
        name: "ControlGeneral",
        methods: {
            send: function (command) {
                this.$socket.sendObj({command: {commandType: command}})
            },
            triggerContinue() {
                this.$socket.sendObj({trigger: {triggerType: 'continue'}})
            }
        },
        computed: {
            keymapHalt() {
                return {'numpad .': () => this.send('halt')}
            },
            keymapStop() {
                return {'numpad 0': () => this.send('stop')}
            },
            keymapForceStart() {
                return {'numpad 5': () => this.send('forceStart')}
            },
            keymapNormalStart() {
                return {'numpad -': () => this.send('normalStart')}
            },
            keymapContinue() {
                return {'numpad +': () => this.triggerContinue()}
            },
            state() {
                return this.$store.state.refBoxState
            },
            halted() {
                return this.state.command === 'halt';
            },
            stopped() {
                return this.state.command === 'stop';
            },
            prepareSth() {
                return this.state.command === 'kickoff' || this.state.command === 'penalty';
            },
            inNormalHalf() {
                return isInNormalHalf(this.state);
            },
            gameEventPresent() {
                return this.state.gameEvent !== 'none';
            }
        }
    }
</script>

<style scoped>
    button {
        margin-right: 0.5em;
        margin-bottom: 0.5em;
    }
</style>