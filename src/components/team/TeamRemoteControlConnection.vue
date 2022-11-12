<template>
    <div>
        <span v-help-text="'Remote control connected'"
              v-if="connected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="signal"/>
        </span>
        <span v-help-text="'Remote control not connected'"
              v-if="!connected">
            <font-awesome-icon
                    class="fa-xs"
                    icon="times-circle"/>
        </span>
    </div>
</template>

<script>
    export default {
        name: "TeamRemoteControlConnection",
        props: {
            teamColor: String
        },
        computed: {
            connected() {
                return this.$store.state.gcState.teamState[this.teamColor].remoteControlConnected
            },
        }
    }
</script>

<style scoped>
</style>
