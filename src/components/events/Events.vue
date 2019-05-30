<template>
    <div>
        <EventTable :current-page="currentPage" :per-page="perPage" :events="events"/>
        <div class="event-controls-container">

            <b-pagination size="sm"
                          :total-rows="events.length"
                          v-model="currentPage"
                          :per-page="perPage"/>

            <input v-model.number="perPage"
                   title="Rows per page"
                   min="1"
                   max="99"
                   type="number"
            />
        </div>
    </div>
</template>

<script>
    import EventTable from "./EventTable";

    export default {
        name: "Events",
        components: {
            EventTable,
        },
        data() {
            return {
                currentPage: 1,
                perPage: 5,
            }
        },
        computed: {
            events() {
                return [...this.$store.state.protocol].reverse();
            },
            state() {
                return this.$store.state.refBoxState
            },
        },
        mounted() {
            if (localStorage.gameEventsPerPage) {
                this.perPage = parseInt(localStorage.gameEventsPerPage);
            }
        },
        watch: {
            perPage(perPage) {
                localStorage.gameEventsPerPage = perPage;
            }
        }
    }
</script>

<style scoped>
    .event-controls-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    input {
        text-align: center;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
</style>
