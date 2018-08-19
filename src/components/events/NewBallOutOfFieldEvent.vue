<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event1 variant="secondary">
                    through the touch line
                </b-btn>
            </b-card-header>
            <b-collapse id="accordion-event1" accordion="accordion-event" role="tabpanel">
                <b-card-body>
                    <TeamSelection :newEvent="newEvent" label="By: "/>
                    <b-button variant="primary"
                              @click="send('ballLeftFieldTouchLine')"
                              :disabled="newEvent.team === null">
                        Add
                    </b-button>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion-event2 variant="secondary">
                    through the goal line
                </b-btn>
            </b-card-header>
            <b-collapse id="accordion-event2" accordion="accordion-event" role="tabpanel">
                <b-card-body>
                    <TeamSelection :newEvent="newEvent" label="By: "/>
                    <b-button variant="primary"
                              @click="send('ballLeftFieldGoalLine')"
                              :disabled="newEvent.team === null">
                        Add
                    </b-button>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import TeamSelection from "../common/TeamSelection";

    export default {
        name: "NewBallOutOfFieldEvent",
        components: {TeamSelection},
        data() {
            return {
                newEvent: {
                    team: null
                }
            }
        },
        methods: {
            send: function (type) {
                this.$socket.sendObj({gameEvent: {[type]: this.newEvent}});
                this.$root.$emit('bv::hide::modal', 'new-event-modal');
            }
        },
    }
</script>

<style scoped>

</style>