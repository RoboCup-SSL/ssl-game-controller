<template>
    <div id="app">
        <div id="app-header">
            <ControlGeneral class="app-header-item"/>
            <GameState id="game-state" class="app-header-item"/>
        </div>
        <div id="main-elements">
            <TeamOverview class="view"/>
            <ControlTeam class="view" team-color="Yellow"/>
            <ControlTeam class="view" team-color="Blue"/>
            <Events/>
            <CurrentEvents class="view"/>
            <EventProposals class="view"/>
        </div>
        <ControlMatch id="match-controls"/>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";
    import ControlGeneral from "./components/control/ControlGeneral";
    import ControlTeam from "./components/control/ControlTeam";
    import ControlMatch from "./components/control/ControlMatch";
    import Events from "./components/events/Events";
    import EventProposals from "./components/events/EventProposals";
    import CurrentEvents from "./components/events/CurrentEvents";

    export default {
        name: 'app',
        components: {
            CurrentEvents,
            EventProposals,
            Events,
            ControlMatch,
            ControlTeam,
            ControlGeneral,
            TeamOverview,
            GameState
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    #app-header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: baseline;
        align-content: flex-start;
    }

    .app-header-item {
        margin: 0.3em;
    }

    #game-state {
        font-size: 1.2em;
        font-weight: bold;
    }

    #main-elements {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
        flex-grow: 1;
    }

    #match-controls {
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
    }

    .view {
        margin: 0.5em;
    }
</style>
