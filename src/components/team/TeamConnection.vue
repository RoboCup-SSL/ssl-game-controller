<template>
    <div>
        <span v-help-text="'Team connected'"
              v-if="teamConnected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="signal"/>
        </span>
        <span v-help-text="'connection verified'"
              class="connection-verified"
              v-if="teamConnectionVerified">
            <font-awesome-icon
                    class="fa-xs"
                    icon="shield-alt"/>
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
            teamConnectionVerified() {
                return this.$store.state.gcState.teamState[this.teamColor].connectionVerified
            }
        }
    }
</script>

<style scoped>
    .connection-verified {
        margin-left: 0.3em;
    }
</style>
