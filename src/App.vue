<template>
    <div id="app">
        <div id="app-header">
            <ControlGeneral class="app-header-item"/>
            <GameState id="game-state" class="app-header-item"/>
        </div>
        <div id="main-elements">
            <div class="team-container">
                <h2>Yellow Team</h2>
                <TeamOverview class="team-views" team-color="Yellow"/>
                <ControlTeam class="team-views" team-color="Yellow"/>
                <ControlTeamEvent class="team-views" team-color="Yellow"/>
            </div>
            <div class="main-middle-container">
                <GameEvents/>
                <iframe src="http://localhost:8082/" frameborder="none"></iframe>
            </div>
            <div class="team-container">
                <h2>Blue Team</h2>
                <TeamOverview class="team-views" team-color="Blue"/>
                <ControlTeam class="team-views" team-color="Blue"/>
                <ControlTeamEvent class="team-views" team-color="Blue"/>
            </div>
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
    import ControlTeamEvent from "./components/control/ControlTeamEvent";
    import GameEvents from "./components/GameEvents";

    export default {
        name: 'app',
        components: {
            GameEvents,
            ControlTeamEvent,
            ControlMatch,
            ControlTeam,
            ControlGeneral,
            TeamOverview,
            GameState
        }
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
        flex-wrap: wrap-reverse;
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

    .main-middle-container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: stretch;
        flex-grow: 1;
    }

    .main-middle-container iframe {
        flex-grow: 1;
        width: 100%;
        height: 100%;
    }

    .team-container {
        display: flex;
        flex-direction: column;
    }

    #match-controls {
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
    }

    .team-views {
        float: left;
        margin: 0.5em;
    }
</style>
