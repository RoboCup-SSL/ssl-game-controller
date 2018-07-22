<template>
    <div class="game-state">
        <div>State: {{gameStatus}}</div>
        <div>Time left: {{gameTimeLeft}}</div>
    </div>
</template>

<script>
    export default {
        name: 'GameState',
        computed: {
            gameStatus() {
                return this.$store.state.refBoxState.gameStatus
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
