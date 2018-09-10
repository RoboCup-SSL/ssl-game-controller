<template>
    <div>
        <b-button variant="primary"
                  @click="sendEvent()">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../../common/TeamSelection";

    export default {
        name: "NoProgressInGame",
        components: {TeamSelection},
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'noProgressInGame',
                        details: {
                            ['noProgressInGame']: {}
                        }
                    }
                });
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>