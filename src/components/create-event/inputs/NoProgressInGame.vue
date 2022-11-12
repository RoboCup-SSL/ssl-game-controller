<template>
    <div>
        <b-button variant="primary"
                  @click="sendEvent()">
            Add
        </b-button>
    </div>
</template>

<script>
    import TeamSelection from "@/components/common/TeamSelection";
    import {submitGameEvent} from "@/submit";

    export default {
        name: "NoProgressInGame",
        components: {TeamSelection},
        methods: {
            sendEvent: function () {
                submitGameEvent({
                    type: 'NO_PROGRESS_IN_GAME',
                    noProgressInGame: {}
                });
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>
