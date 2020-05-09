<template>
    <div>
        <a class="btn-edit substitution-button" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="botSubstitutionIntent"/>
            <font-awesome-icon icon="toggle-off" v-if="!botSubstitutionIntent"/>
        </a>
    </div>
</template>

<script>
    import {submitChange} from "../../submit";

    export default {
        name: "TeamBotSubstitution",
        props: {
            teamColor: String,
        },
        methods: {
            edit: function () {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        botSubstitutionIntent: !this.botSubstitutionIntent
                    }
                });
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            botSubstitutionIntent() {
                return this.teamState.requestsBotSubstitution;
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
