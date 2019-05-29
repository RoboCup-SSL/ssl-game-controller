<template>
    <div>
        <TeamSelection :model="model" label="By: "/>
        <BotSelection :model="model" label="By Bot: "/>
        <LocationSelection :model="model.startLocation" label="Start [m]: "/>
        <LocationSelection :model="model.endLocation" label="End [m]: "/>
        <b-button variant="primary"
                  @click="sendEvent()"
                  :disabled="model.team === null">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "../../common/TeamSelection";
    import BotSelection from "../../common/BotSelection";
    import LocationSelection from "../../common/LocationSelection";
    import {convertStringLocation} from "../../../refereeState";

    export default {
        name: "BotDribbledBallTooFar",
        components: {BotSelection, TeamSelection, LocationSelection},
        data() {
            return {
                model: {
                    team: null,
                    id: null,
                    startLocation: {x: null, y: null},
                    endLocation: {x: null, y: null}
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'botDribbledBallTooFar',
                        details: {
                            ['botDribbledBallTooFar']: {
                                by_team: this.model.team.toLocaleUpperCase(),
                                by_bot: parseInt(this.model.id),
                                start: convertStringLocation(this.model.startLocation),
                                end: convertStringLocation(this.model.endLocation)
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
