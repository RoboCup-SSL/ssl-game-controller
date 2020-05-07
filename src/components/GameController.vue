<template>
    <div id="game-controller">
        <div v-if="initialized">
            <div id="app-header">
                <MatchSettingsBar class="app-header-item"/>
                <GameStateBar class="app-header-item"/>
            </div>

            <router-view></router-view>

            <ControlFlowBar id="match-controls"/>
            <SwitchWindowBar/>
            <ActiveTrackerSource/>
        </div>
        <div v-else>
            <p>No state received yet. Is the backend running?</p>
        </div>
    </div>
</template>

<script>
    import MatchSettingsBar from "./control/MatchSettingsBar";
    import GameStateBar from './GameStateBar.vue'
    import ControlFlowBar from "./control/ControlFlowBar";
    import SwitchWindowBar from "./control/SwitchWindowBar";
    import ActiveTrackerSource from "./control/ActiveTrackerSource";

    export default {
        name: 'GameController',
        components: {
            ActiveTrackerSource,
            SwitchWindowBar,
            MatchSettingsBar,
            GameStateBar,
            ControlFlowBar,
        },
        computed: {
            initialized() {
                return this.$store.state.initialized;
            },
        }
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
