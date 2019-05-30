<template>
    <div class="game-controller-view">
        <h2>Game Events</h2>
        <div class="game-events">
            <CurrentEvents/>
            <hr>
            <EventProposals/>
        </div>
    </div>
</template>

<script>
    import CurrentEvents from "./CurrentEvents";
    import EventProposals from "./EventProposals";

    export default {
        name: "GameEventsView",
        components: {
            EventProposals,
            CurrentEvents
        }
    }
</script>

<style scoped>

    .game-events {
        text-align: left;
        overflow-y: auto;
        max-height: 85vh;
    }

</style>
