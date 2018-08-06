<template>
    <div id="app">
        <GameState/>
        <TeamOverview class="team-views" team-color="Yellow"/>
        <TeamOverview class="team-views" team-color="Blue"/>
        <ControlTeam class="team-views" team-color="Yellow"/>
        <ControlTeam class="team-views" team-color="Blue"/>
        <ControlGeneral/>
        <ControlMatch class="match-controls"/>
        <Debug class="debug"/>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";
    import ControlGeneral from "./components/control/ControlGeneral";
    import ControlTeam from "./components/control/ControlTeam";
    import Debug from "./components/Debug";
    import ControlMatch from "./components/control/ControlMatch";

    export default {
        name: 'app',
        components: {
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
        margin-top: 1em;
    }

    .debug {
        position: fixed;
        bottom: 0;
    }

    .match-controls {
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
