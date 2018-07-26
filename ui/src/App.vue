<template>
    <div id="app">
        <GameState/>
        <pre style="text-align: left">{{ latestMessage }}</pre>
        <TeamOverview team-color="Yellow" style="float: left"/>
        <TeamOverview team-color="Blue" style="float: left"/>
        <ControlGeneral/>
        <ControlTeam team-color="Yellow"/>
        <ControlTeam team-color="Blue"/>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";
    import ControlGeneral from "./components/control/ControlGeneral";
    import ControlTeam from "./components/control/ControlTeam";

    export default {
        name: 'app',
        components: {
            ControlTeam,
            ControlGeneral,
            TeamOverview,
            GameState
        },
        computed: {
            latestMessage() {
                return JSON.stringify(this.$store.state.latestMessage, null, 4)
            }
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
        margin-top: 60px;
    }
</style>
