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
        name: "PlacementFailedByTeamInFavor",
        components: {TeamSelection},
        data() {
            return {
                model: {
                    team: null,
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'placementFailedByTeamInFavor',
                        details: {
                            ['placementFailedByTeamInFavor']: {
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