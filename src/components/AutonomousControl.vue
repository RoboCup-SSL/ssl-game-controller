<template>
    <div id="container">
        <ManualControl/>
        <TeamOverview/>
        <Events/>
        <GameEvents/>
    </div>
</template>

<script>
    import TeamOverview from "./team/TeamOverview";
    import ControlTeam from "./manual-control/ManualControlTeam";
    import Events from "./protocol/Events";
    import Settings from "./settings/Settings";
    import ManualControl from "./manual-control/ManualControl";
    import GameEvents from "./game-events/GameEvents";

    export default {
        name: "AutonomousControl",
        components: {
            GameEvents,
            ManualControl,
            Settings,
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

</style>
