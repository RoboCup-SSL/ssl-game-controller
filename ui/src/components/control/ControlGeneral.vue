<template>
    <span class="control-general">
        <b-button v-hotkey="keymapHalt"
                  v-on:click="send('halt')"
                  v-bind:disabled="halted">
            Halt
        </b-button>
        <b-button v-hotkey="keymapStop"
                  v-on:click="send('stop')"
                  v-bind:disabled="stopped || !inNormalHalf">
            Stop
        </b-button>
        <b-button v-hotkey="keymapForceStart"
                  v-on:click="send('forceStart')"
                  v-bind:disabled="!stopped || !inNormalHalf">
            Force Start
        </b-button>
        <b-button v-hotkey="keymapNormalStart"
                  v-on:click="send('normalStart')"
                  v-bind:disabled="!prepareSth || !inNormalHalf">
            Normal Start
        </b-button>
    </span>
</template>

<script>
    import {isInNormalHalf} from "../../main";

    export default {
        name: "ControlGeneral",
        methods: {
            send: function (command) {
                this.$socket.sendObj({'command': {'commandType': command}})
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
                return {'numpad +': () => this.send('normalStart')}
            },
            state() {
                return this.$store.state.refBoxState
            },
            halted() {
                return this.state.gameState === 'Halted';
            },
            stopped() {
                return this.state.gameState === 'Stopped';
            },
            prepareSth() {
                return this.state.gameState.startsWith('Prepare');
            },
            inNormalHalf() {
                return isInNormalHalf(this.state);
            },
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>