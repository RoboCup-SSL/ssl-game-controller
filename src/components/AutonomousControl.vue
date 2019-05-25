<template>
    <div id="container">
        <TeamOverview class="view"/>
        <Events/>
        <CurrentEvents class="view"/>
        <EventProposals class="view"/>
    </div>
</template>

<script>
    import TeamOverview from "./team/TeamOverview";
    import ControlTeam from "./manual-control/ManualControlTeam";
    import Events from "./events/Events";
    import EventProposals from "./events/EventProposals";
    import CurrentEvents from "./events/CurrentEvents";
    import Settings from "./settings/Settings";

    export default {
        name: "AutonomousControl",
        components: {
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

    .view {
        margin: 0.5em;
    }

</style>
