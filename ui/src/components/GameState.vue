<template>
    <div class="game-state">
        {{stage}} - {{gameTimeElapsed}} - {{gameTimeLeft}} - {{gameState}}
    </div>
</template>

<script>
    export default {
        name: 'GameState',
        computed: {
            stage() {
                return this.$store.state.refBoxState.stage
            },
            gameState() {
                return this.$store.state.refBoxState.gameState
            },
            gameTimeElapsed() {
                return this.$store.state.refBoxState.gameTimeElapsed
            },
            gameTimeLeft() {
                return this.$store.state.refBoxState.gameTimeLeft
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
