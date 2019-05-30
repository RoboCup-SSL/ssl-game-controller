<template>
    <div id="container">
        <ManualControl class="game-controller-view"/>
        <TeamOverview class="game-controller-view"/>
        <Events class="game-controller-view"/>
        <div class="game-controller-view">
            <h2>Game Events</h2>
            <div class="game-events">
                <CurrentEvents/>
                <hr>
                <EventProposals/>
            </div>
        </div>
    </div>
</template>

<script>
    import TeamOverview from "./team/TeamOverview";
    import ControlTeam from "./manual-control/ManualControlTeam";
    import Events from "./events/Events";
    import EventProposals from "./events/EventProposals";
    import CurrentEvents from "./events/CurrentEvents";
    import Settings from "./settings/Settings";
    import ManualControl from "./manual-control/ManualControl";

    export default {
        name: "AutonomousControl",
        components: {
            ManualControl,
            Settings,
            CurrentEvents,
            EventProposals,
            Events,
            ControlTeam,
            TeamOverview,
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

    .game-events {
        text-align: left;
        overflow-y: auto;
        max-height: 85vh;
    }

</style>
