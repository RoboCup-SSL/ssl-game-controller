<template>
    <div class="control-team">
        <h2>Team {{teamColor}}</h2>
        <button v-hotkey="keymapKickoff" v-on:click="send('kickoff')">Kickoff</button>
        <button v-on:click="send('penalty')">Penalty</button>
        <button v-hotkey="keymapDirect" v-on:click="send('direct')">Direct</button>
        <button v-hotkey="keymapIndirect" v-on:click="send('indirect')">Indirect</button>
    </div>
</template>

<script>
    export default {
        name: "ControlTeam",
        props: ["teamColor"],
        methods: {
            send: function (command) {
                this.$socket.sendObj({'command': {'forTeam': this.teamColor, 'commandType': command}})
            }
        },
        computed: {
            keymapKickoff() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 1': () => this.send('kickoff')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 3': () => this.send('kickoff')};
                }
            },
            keymapDirect() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 7': () => this.send('direct')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 9': () => this.send('direct')};
                }
            },
            keymapIndirect() {
                if (this.teamColor === 'Yellow') {
                    return {'numpad 4': () => this.send('indirect')};
                } else if (this.teamColor === 'Blue') {
                    return {'numpad 6': () => this.send('indirect')};
                }
            },
        }
    }
</script>

<style scoped>

</style>