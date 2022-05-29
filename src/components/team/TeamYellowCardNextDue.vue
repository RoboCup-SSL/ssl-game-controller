<template>
        <span v-help-text="'Next yellow card due'"
              v-format-ns-duration="latestCardTime">
        </span>
</template>

<script>
import {TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";
import {convertDurationToTimestamp} from "@/TimestampFormatter";

export default {
    name: "TeamYellowCardNextDue",
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
        latestCardTime() {
            if (this.activeYellowCards.length > 0) {
                let cards = [];
                for (let card of this.activeYellowCards) {
                    cards.push(convertDurationToTimestamp(card.timeRemaining))
                }
                cards.sort(function (a, b) {
                    return a - b;
                });
                return cards[0];
            }
            return 0;
        },
        activeYellowCards() {
            return this.team.yellowCards.filter(e => e.timeRemaining !== '0s');
        }
    }
}
</script>

<style scoped>
</style>
