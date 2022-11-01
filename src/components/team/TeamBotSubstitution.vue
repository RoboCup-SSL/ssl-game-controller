<template>
    <div>
        <a class="btn-edit toggle-button" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="requestsBotSubstitution"/>
            <font-awesome-icon icon="toggle-off" v-if="!requestsBotSubstitution"/>
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
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        requestsBotSubstitution: !this.requestsBotSubstitution
                    }
                });
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            requestsBotSubstitution() {
                return this.teamState.requestsBotSubstitutionSince !== null;
            },
        }
    }
</script>

<style scoped>
    .toggle-button {
        font-size: 14pt;
        padding:15px;
    }
</style>
