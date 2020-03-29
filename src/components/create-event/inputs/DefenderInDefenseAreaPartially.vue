<template>
    <div>
        <TeamSelection :model="model" label="By: "/>
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
    import TeamSelection from "@/components/common/TeamSelection";
    import BotSelection from "@/components/common/BotSelection";
    import LocationSelection from "@/components/common/LocationSelection";
    import {convertStringLocation} from "@/refereeState";
    import {submitGameEvent} from "../../../submit";

    export default {
        name: "DefenderInDefenseAreaPartially",
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
                submitGameEvent({
                    type: 'DEFENDER_IN_DEFENSE_AREA_PARTIALLY',
                    defenderInDefenseAreaPartially: {
                        by_team: this.model.team.toLocaleUpperCase(),
                        by_bot: parseInt(this.model.id),
                        location: convertStringLocation(this.model.location)
                    }
                });
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>
