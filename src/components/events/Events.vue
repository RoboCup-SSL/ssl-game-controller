<template>
    <div>
        <EventTable :current-page="currentPage" :per-page="perPage" :events="events"/>
        <div class="event-controls-container">
            <b-pagination size="sm"
                          :total-rows="events.length"
                          v-model="currentPage"
                          :per-page="perPage">
            </b-pagination>

            <b-btn v-b-modal.new-event-modal size="sm" variant="primary" :disabled="newEventDisabled">New</b-btn>
            <b-modal id="new-event-modal"
                     title="New Game Event"
                     :lazy="true">
                <NewEvent/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import EventTable from "./EventTable";
    import NewEvent from "./NewEvent";

    export default {
        name: "Events",
        components: {EventTable, NewEvent},
        data() {
            return {
                currentPage: 1,
                perPage: 5,
            }
        },
        computed: {
            events() {
                return this.$store.state.gameEvents;
            },
            state() {
                return this.$store.state.refBoxState
            },
            newEventDisabled() {
                return this.state.command !== 'stop' && this.state.command !== 'halt';
            }
        },
    }
</script>

<style scoped>
    .event-controls-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .event-controls-container button {
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
</style>