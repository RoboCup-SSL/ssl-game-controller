<template>
    <div>
        <TeamSelection :model="model" label="By: " :allow-unknown-team="false"/>
        <BotSelection :model="model" label="By Bot: "/>
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
    import BotSelection from "../../common/BotSelection";
    import LocationSelection from "../../common/LocationSelection";
    import {convertStringLocation} from "../../../refereeState";

    export default {
        name: "BotKickedBallTooFast",
        components: {BotSelection, TeamSelection, LocationSelection},
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
                        type: 'botKickedBallTooFast',
                        details: {
                            ['botKickedBallTooFast']: {
                                by_team: this.model.team.toLocaleUpperCase(),
                                by_bot: parseInt(this.model.id),
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