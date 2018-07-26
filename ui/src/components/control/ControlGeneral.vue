<template>
    <div class="control-general">
        <button v-hotkey="keymapHalt" v-on:click="send('halt')">Halt</button>
        <button v-hotkey="keymapStop" v-on:click="send('stop')">Stop</button>
        <button v-hotkey="keymapForceStart" v-on:click="send('forceStart')">Force Start</button>
        <button v-hotkey="keymapNormalStart" v-on:click="send('normalStart')">Normal Start</button>
    </div>
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

</style>