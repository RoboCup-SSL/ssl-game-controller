<template>
    <div>
        <span v-help-text="'Team requests to stop'"
              v-if="isStop">
            <font-awesome-icon
                class="fa-xs"
                icon="stop-circle"/>
        </span>
        <span v-help-text="'Team requests to continue'"
              v-if="isContinue">
        <font-awesome-icon
            class="fa-xs"
            icon="play-circle"/>
        </span>
    </div>
</template>

<script>
export default {
    name: "TeamAdvantageChoice",
    props: {
        teamColor: String
    },
    data() {
        return {
            now: Date.now()
        }
    },
    created () {
        let self = this;
        setInterval(function () {
            self.now = Date.now()
        }, 100)
    },
    computed: {
        teamConnected() {
            return this.$store.state.gcState.teamState[this.teamColor].connected &&
                this.$store.state.gcState.teamState[this.teamColor].advantageChoice;
        },
        isStop() {
            return this.teamConnected &&
                this.$store.state.gcState.teamState[this.teamColor].advantageChoice.choice === 'STOP';
        },
        isContinue() {
            return this.teamConnected &&
                this.$store.state.gcState.teamState[this.teamColor].advantageChoice.choice === 'CONTINUE';
        },
    }
}
</script>

<style scoped>
</style>
