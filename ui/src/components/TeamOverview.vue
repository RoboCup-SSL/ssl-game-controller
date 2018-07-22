<template>
    <div class="team-overview">
        <p>Team {{teamColor}}</p>
        <div>Score: {{score}}</div>
        <div>Yellow Cards: {{yellowCards}}</div>
        <button v-hotkey="keymap" v-on:click="clickButton">Yellow Card</button>
    </div>
</template>

<script>
    export default {
        name: "TeamOverview",
        props: {'teamColor': ''},
        computed: {
            score() {
                return this.$store.state.refBoxState.team_state[this.teamColor].score
            },
            yellowCards() {
                return this.$store.state.refBoxState.team_state[this.teamColor].yellow_cards
            },
            keymap() {
                switch (this.teamColor) {
                    case 'YELLOW':
                        return {'numpad 4': this.clickButton};
                    case 'BLUE':
                        return {'numpad 6': this.clickButton};
                }
            }
        },
        methods: {
            clickButton: function () {
                this.$socket.sendObj({'yellow_card': {'for_team': this.teamColor}})
            }
        }
    }
</script>

<style scoped>

</style>