<template>
    <div>
        <TeamSelection :model="model" label="By: " :allow-unknown-team="false"/>
        <BotSelection :model="model.violator" label="Violator Bot: "/>
        <BotSelection :model="model.victim" label="Victim Bot: "/>
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
        name: "BotCrashUnique",
        components: {BotSelection, TeamSelection, LocationSelection},
        data() {
            return {
                model: {
                    team: null,
                    violator: {id: null},
                    victim: {id: null},
                    location: {x: null, y: null},
                }
            }
        },
        methods: {
            sendEvent: function () {
                this.$socket.sendObj({
                    gameEvent: {
                        type: 'botCrashUnique',
                        details: {
                            ['botCrashUnique']: {
                                by_team: this.model.team.toLocaleUpperCase(),
                                violator: parseInt(this.model.violator.id),
                                victim: parseInt(this.model.victim.id),
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