<template>
    <div>
        <a class="btn-edit substitution-button" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="botSubstitutionIntend"/>
            <font-awesome-icon icon="toggle-off" v-if="!botSubstitutionIntend"/>
        </a>
    </div>
</template>

<script>
    export default {
        name: "TeamBotSubstitution",
        props: {
            teamColor: String,
        },
        methods: {
            edit: function () {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'botSubstitutionIntend': !this.botSubstitutionIntend
                    }
                })
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            botSubstitutionIntend() {
                return this.teamState.botSubstitutionIntend;
            },
        }
    }
</script>

<style scoped>
    .substitution-button {
        font-size: 14pt;
        padding:15px;
    }
</style>
