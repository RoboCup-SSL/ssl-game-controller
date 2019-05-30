<template>
    <div id="app">
        <div id="app-header">
            <MatchSettingsBar class="app-header-item"/>
            <GameStateBar class="app-header-item"/>
        </div>

        <router-view></router-view>

        <ControlFlowBar id="match-controls"/>
    </div>
</template>

<script>
    import MatchSettingsBar from "./components/control/MatchSettingsBar";
    import GameStateBar from './components/GameStateBar.vue'
    import ControlFlowBar from "./components/control/ControlFlowBar";

    export default {
        name: 'app',
        components: {
            MatchSettingsBar,
            GameStateBar,
            ControlFlowBar,
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
</style>
