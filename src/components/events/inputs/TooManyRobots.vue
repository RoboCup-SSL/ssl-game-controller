<template>
    <div>
        <TeamSelection :model="model" label="By: " :allow-unknown-team="false"/>
        <b-button variant="primary"
                  @click="sendEvent()"
                  :disabled="model.team === null">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../../common/TeamSelection";

    export default {
        name: "TooManyRobots",
        components: {TeamSelection},
        data() {
            return {
                model: {
                    team: null,
                    id: null,
                    location: {x: null, y: null}
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'tooManyRobots',
                        details: {
                            ['tooManyRobots']: {
                                by_team: this.model.team.toLocaleUpperCase(),
                            }
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