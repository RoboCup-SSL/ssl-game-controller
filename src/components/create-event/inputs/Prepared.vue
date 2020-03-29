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
    import {submitGameEvent} from "../../../submit";

    export default {
        name: "Prepared",
        components: {TeamSelection},
        methods: {
            sendEvent: function () {
                submitGameEvent( {
                        type: 'PREPARED',
prepared: {}
                        });
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>
