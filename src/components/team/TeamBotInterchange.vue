<template>
    <div>
        <label>Intends to interchange a bot: </label>
        <a class="btn-edit" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="botInterchangeIntend"/>
            <font-awesome-icon icon="toggle-off" v-if="!botInterchangeIntend"/>
        </a>
    </div>
</template>

<script>
    export default {
        name: "TeamBotInterchange",
        props: {
            teamColor: String
        },
        methods: {
            edit: function () {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'botInterchangeIntend': !this.botInterchangeIntend
                    }
                })
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            botInterchangeIntend() {
                return this.teamState.botInterchangeIntend;
            },
        }
    }
</script>

<style scoped>
    .btn-edit {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }
</style>