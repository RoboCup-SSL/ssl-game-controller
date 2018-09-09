<template>
    <div>
        <BotSelection :model="model.botYellow" label="Yellow Bot: "/>
        <BotSelection :model="model.botBlue" label="Blue Bot: "/>
        <LocationSelection :model="model.location" label="Location [mm]: "/>
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
        name: "BotCrashDrawn",
        components: {BotSelection, TeamSelection, LocationSelection},
        data() {
            return {
                model: {
                    botYellow: {id: null},
                    botBlue: {id: null},
                    location: {x: null, y: null},
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'botCrashDrawn',
                        details: {
                            ['botCrashDrawn']: {
                                bot_yellow: parseInt(this.model.botYellow.id),
                                bot_blue: parseInt(this.model.botBlue.id),
                                location: convertStringLocation(this.model.location),
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