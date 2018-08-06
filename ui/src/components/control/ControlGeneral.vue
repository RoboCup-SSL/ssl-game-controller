<template>
    <span class="control-general">
        <b-button v-hotkey="keymapHalt" v-on:click="send('halt')">Halt</b-button>
        <b-button v-hotkey="keymapStop" v-on:click="send('stop')">Stop</b-button>
        <b-button v-hotkey="keymapForceStart" v-on:click="send('forceStart')">Force Start</b-button>
        <b-button v-hotkey="keymapNormalStart" v-on:click="send('normalStart')">Normal Start</b-button>
    </span>
</template>

<script>
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
        }
    }
</script>

<style scoped>
    button {
        margin: 0.5em;
    }
</style>