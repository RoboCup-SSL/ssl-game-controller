<template>
    <div>
        <EventTable :current-page="currentPage" :per-page="perPage" :events="events"/>
        <div class="event-controls-container">
            <span class="auto-refs-connected" v-b-tooltip.hover :title="autoRefs"><b>{{autoRefsConnected}}</b> autoRefs connected. </span>

            <b-pagination size="sm"
                          :total-rows="events.length"
                          v-model="currentPage"
                          :per-page="perPage">
            </b-pagination>

            <b-btn v-b-modal.new-event-modal size="sm" variant="primary">New Event</b-btn>
            <b-modal id="new-event-modal"
                     title="New Game Event"
                     :lazy="true">
                <NewEvent/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>

            <b-btn v-b-modal.place-ball-modal size="sm" variant="primary">Place ball</b-btn>
            <b-modal id="place-ball-modal"
                     title="Place ball"
                     :lazy="true">
                <PlaceBall/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>

            <b-btn v-b-modal.event-behavior-modal size="sm" variant="primary">Configure Behaviors</b-btn>
            <b-modal id="event-behavior-modal"
                     title="Game Event Behaviors"
                     :lazy="true">
                <EventBehavior/>
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
    import EventBehavior from "./EventBehavior";
    import PlaceBall from "./PlaceBall";

    export default {
        name: "Events",
        components: {PlaceBall, EventBehavior, EventTable, NewEvent},
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
            autoRefsConnected() {
                if (this.state.autoRefsConnected != null) {
                    return this.state.autoRefsConnected.length;
                }
                return 0;
            },
            autoRefs() {
                if (this.autoRefsConnected) {
                    let autoRefs = 'Connected AutoRefs: ';
                    for (let i = 0; i < this.state.autoRefsConnected.length; i++) {
                        autoRefs += this.state.autoRefsConnected[i];
                        if (i !== (this.state.autoRefsConnected.length - 1)) {
                            autoRefs += ', '
                        }
                    }
                    return autoRefs;
                }
            },
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

    .auto-refs-connected {
        margin-top: 0.2rem;
        margin-right: 1rem;
    }
</style>