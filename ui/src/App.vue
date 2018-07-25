<template>
    <div id="app">
        <GameState/>
        <TeamOverview team-color="Yellow" style="float: left"/>
        <TeamOverview team-color="Blue" style="float: right"/>
        <p>latest message:<br> {{ latestMessage }}</p>
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
                return this.$store.state.latestMessage
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
