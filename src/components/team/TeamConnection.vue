<template>
    <div>
        <span v-b-tooltip.hover
              title="Team connected"
              v-if="teamConnected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="signal"/>
        </span>
        <span v-b-tooltip.hover
              title="connection verified"
              class="connection-verified"
              v-if="teamConnectionVerified">
            <font-awesome-icon
                    class="fa-xs"
                    icon="shield-alt"/>
        </span>
        <span v-b-tooltip.hover
              title="Team not connected"
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
                return this.$store.state.gcState.teamConnected[this.teamColor]
            },
            teamConnectionVerified() {
                return this.$store.state.gcState.teamConnectionVerified[this.teamColor]
            }
        }
    }
</script>

<style scoped>
    .connection-verified {
        margin-left: 0.3em;
    }
</style>
