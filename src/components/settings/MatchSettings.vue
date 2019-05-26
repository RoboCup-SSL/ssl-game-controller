<template>
    <div>
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

        <div class="divisions btn-group-toggle btn-group">
            <label :class="{btn:true, 'btn-secondary': true, active: isDivA, disabled: forbidMatchControls}"
                   @click="switchDivision('DivA')"
                   :disabled="forbidMatchControls">
                Div A
            </label>
            <label :class="{btn:true, 'btn-secondary': true, active: !isDivA, disabled: forbidMatchControls}"
                   @click="switchDivision('DivB')">
                Div B
            </label>
        </div>

        <b-button v-b-tooltip.hover title="Start a new match by resetting everything"
                  v-on:click="resetMatch">
            Start new game
        </b-button>

        <b-button v-b-tooltip.hover title="Undo the last state change"
                  v-on:click="undo">
            Undo last change
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "MatchSettings",
        data() {
            return {
                selected: 'DivA',
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
            undo: function () {
                this.$socket.sendObj({
                    'trigger': {'triggerType': 'undo'}
                })
            },
            switchDivision(division) {
                this.$socket.sendObj({
                    'modify': {'division': division}
                })
            }
        },
        computed: {
            state() {
                return this.$store.state.refBoxState
            },
            isDivA() {
                return this.$store.state.gcState.division === 'DivA';
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
    button, .divisions {
        margin: 0.5em;
    }
</style>
