<template>
    <div>
        <TeamSelection :model="model" label="For: "/>
        <LocationSelection :model="model.location" label="Location [m]: "/>
        <b-button variant="primary"
                  @click="sendEvent()"
                  :disabled="model.team === null || !ballLocationSet">
            Add
        </b-button>
    </div>
</template>

<script>
    import LocationSelection from "../common/LocationSelection";
    import TeamSelection from "../common/TeamSelection";
    import {convertStringLocation} from "../../refereeState";
    import {isNumeric} from "../../util";
    import {submitChange, submitNewCommand} from "../../submit";

    export default {
        name: "PlaceBall",
        components: {
            TeamSelection,
            LocationSelection
        },
        data() {
            return {
                model: {
                    team: null,
                    id: null,
                    location: {x: 0.0, y: 0.0}
                }
            }
        },
        computed: {
            ballLocationSet() {
                return isNumeric(this.model.location.x)
                    && isNumeric(this.model.location.y)
            }
        },
        methods: {
            sendEvent: function () {
                console.log('place ' + this.model.team)
                submitChange({
                    setBallPlacementPosChange: {
                        pos: convertStringLocation(this.model.location)
                    }
                });
                submitNewCommand('BALL_PLACEMENT', this.model.team);
                this.$root.$emit('bv::hide::modal', 'place-ball-modal');
            }
        }
    }
</script>

<style scoped>
</style>
