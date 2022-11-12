<template>
        <span v-help-text="'Active yellow cards'">
            {{activeYellowCards.length}}
        </span>
</template>

<script>
    import {TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";

    export default {
        name: "TeamYellowCardsActive",
        props: {
            teamColor: String,
        },
        data() {
            return {
                TEAM_YELLOW: TEAM_YELLOW,
                TEAM_BLUE: TEAM_BLUE
            }
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            modalId() {
                return `yellow-card-times-${this.teamColor}-modal`;
            },
            activeYellowCards() {
                return this.team.yellowCards.filter(e => e.timeRemaining !== '0s');
            }
        }
    }
</script>

<style scoped>
</style>
