<template>
    <div id="app">
        <GameState/>
        <TeamOverview team-color="Yellow" style="float: left"/>
        <TeamOverview team-color="Blue" style="float: left"/>
        <ControlGeneral/>
        <ControlTeam team-color="Yellow"/>
        <ControlTeam team-color="Blue"/>
        <ControlMatch/>
        <Debug/>
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
</style>
