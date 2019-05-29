<template>
    <div>
        <TeamSelection :model="model" label="By: "/>
        <LocationSelection :model="model.location" label="Location [m]: "/>
        <b-button variant="primary"
                  @click="sendEvent()"
                  :disabled="model.team === null">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../../common/TeamSelection";
    import LocationSelection from "../../common/LocationSelection";
    import {convertStringLocation} from "../../../refereeState";

    export default {
        name: "KeeperHeldBall",
        components: {TeamSelection, LocationSelection},
        data() {
            return {
                model: {
                    team: null,
                    location: {x: null, y: null}
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'keeperHeldBall',
                        details: {
                            ['keeperHeldBall']: {
                                by_team: this.model.team.toLocaleUpperCase(),
                                location: convertStringLocation(this.model.location)
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
