<template>
    <div id="container">
        <ManualControlView/>
        <TeamOverviewView/>
        <ProtocolView/>
        <GameEventsView/>
    </div>
</template>

<script>
    import ManualControlView from "./manual-control/ManualControlView";
    import TeamOverviewView from "./team/TeamOverviewView";
    import ProtocolView from "./protocol/ProtocolView";
    import GameEventsView from "./game-events/GameEventsView";

    export default {
        name: "AutonomousControl",
        components: {
            ManualControlView,
            TeamOverviewView,
            ProtocolView,
            GameEventsView,
        }
    }
</script>

<style scoped>

    #container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
        flex-grow: 1;
    }

</style>
