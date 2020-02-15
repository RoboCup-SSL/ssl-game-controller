<template>
    <div id="game-controller">
        <div id="app-header">
            <MatchSettingsBar class="app-header-item"/>
            <GameStateBar class="app-header-item"/>
        </div>

        <router-view></router-view>

        <ControlFlowBar id="match-controls"/>
        <SwitchWindowBar/>
    </div>
</template>

<script>
    import MatchSettingsBar from "./control/MatchSettingsBar";
    import GameStateBar from './GameStateBar.vue'
    import ControlFlowBar from "./control/ControlFlowBar";
    import SwitchWindowBar from "./control/SwitchWindowBar";

    export default {
        name: 'GameController',
        components: {
            SwitchWindowBar,
            MatchSettingsBar,
            GameStateBar,
            ControlFlowBar,
        },
    }
</script>

<style>
    #game-controller {
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
