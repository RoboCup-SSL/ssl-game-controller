<template>
    <div>
        <TeamSelection :newEvent="newEvent" label="By: " :allow-unknown-team="false"/>
        <b-button variant="primary"
                  @click="sendEvent()"
                  :disabled="newEvent.team === null">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../../common/TeamSelection";

    export default {
        name: "BallLeftFieldTouchLine",
        components: {TeamSelection},
        data() {
            return {
                newEvent: {
                    team: null
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'ballLeftFieldTouchLine',
                        details: {['ballLeftFieldTouchLine']: {by_team: this.newEvent.team.toLocaleUpperCase()}}
                    }
                });
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>