<template>
    <div>
        <span v-help-text="'Team connected'"
              v-if="teamConnected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="signal"/>
        </span>
        <span v-help-text="'Team not connected'"
              v-if="!teamConnected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="times-circle"/>
        </span>
    </div>
</template>

<script>
    export default {
        name: "TeamConnection",
        props: {
            teamColor: String
        },
        computed: {
            teamConnected() {
                return this.$store.state.gcState.teamState[this.teamColor].connected
            },
        }
    }
</script>

<style scoped>
</style>
