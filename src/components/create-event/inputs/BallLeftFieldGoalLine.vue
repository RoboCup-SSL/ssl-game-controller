<template>
    <div>
        <TeamSelection :model="model" label="By Team: "/>
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
    import {submitGameEvent} from "@/submit";

    export default {
        name: "BallLeftFieldGoalLine",
        components: {LocationSelection, BotSelection, TeamSelection},
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
                    type: 'BALL_LEFT_FIELD_GOAL_LINE',
                    ballLeftFieldGoalLine: {
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
