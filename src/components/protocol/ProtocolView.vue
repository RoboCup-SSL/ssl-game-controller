<template>
    <div class="game-controller-view">
        <h2>Game Protocol</h2>
        <hr>
        <EventTable/>
    </div>
</template>

<script>
    import EventTable from "./ProtocolTable";

    export default {
        name: "Events",
        components: {
            EventTable,
        },
    }
</script>

<style scoped>
    input {
        text-align: center;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
</style>
