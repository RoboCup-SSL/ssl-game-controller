<template>
    <div id="app">
        <GameState/>
        <pre style="text-align: left">{{ latestMessage }}</pre>
        <div>
            <TeamOverview team-color="Yellow" style="float: left"/>
            <TeamOverview team-color="Blue" style="float: left"/>
        </div>
    </div>
</template>

<script>
    import GameState from './components/GameState.vue'
    import TeamOverview from "./components/team/TeamOverview";

    export default {
        name: 'app',
        components: {
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
