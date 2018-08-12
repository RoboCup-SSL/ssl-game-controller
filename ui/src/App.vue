<template>
    <div id="app">
        <div id="app-header">
            <ControlGeneral class="app-header-item"/>
            <GameState id="game-state" class="app-header-item"/>
        </div>
        <div id="main-elements">
            <div class="team-container">
                <TeamOverview class="team-views" team-color="Yellow"/>
                <ControlTeam class="team-views" team-color="Yellow"/>
            </div>
            <div id="field">
                <Field/>
            </div>
            <div class="team-container">
                <TeamOverview class="team-views" team-color="Blue"/>
                <ControlTeam class="team-views" team-color="Blue"/>
            </div>
        </div>
        <ControlMatch id="match-controls"/>
        <Debug id="debug"/>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";
    import ControlGeneral from "./components/control/ControlGeneral";
    import ControlTeam from "./components/control/ControlTeam";
    import Debug from "./components/Debug";
    import ControlMatch from "./components/control/ControlMatch";
    import Field from "./components/field/Field";

    export default {
        name: 'app',
        components: {
            Field,
            ControlMatch,
            Debug,
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
        align-items: flex-start;
        align-content: flex-start;
        flex-grow: 1;
    }

    #field {
        flex-grow: 1;
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

    #debug {
        position: fixed;
        bottom: 0;
    }

    .team-views {
        float: left;
        margin: 0.5em;
    }
</style>
