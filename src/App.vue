<template>
    <div id="app">
        <div id="app-header">
            <MatchSettingsBar class="app-header-item"/>
            <GameState id="game-state" class="app-header-item"/>
        </div>
        <router-view></router-view>
        <ControlFlowBar id="match-controls"/>
    </div>
</template>

<script>
    import MatchSettingsBar from "./components/control/MatchSettingsBar";
    import GameState from './components/GameState.vue'
    import ControlFlowBar from "./components/control/ControlFlowBar";
    import AutonomousControl from "./components/AutonomousControl";

    export default {
        name: 'app',
        components: {
            AutonomousControl,
            MatchSettingsBar,
            GameState,
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

    #game-state {
        font-size: 1.2em;
        font-weight: bold;
    }

    #match-controls {
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
    }

    .view {
        text-align: center;
    }
</style>
