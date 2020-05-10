<template>
    <div>
        <a class="btn-edit toggle-button" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="requestsEmergencyStop"/>
            <font-awesome-icon icon="toggle-off" v-if="!requestsEmergencyStop"/>
        </a>
    </div>
</template>

<script>
    import {submitChange} from "../../submit";

    export default {
        name: "TeamEmergencyStop",
        props: {
            teamColor: String,
        },
        methods: {
            edit: function () {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        requestsEmergencyStop: !this.requestsEmergencyStop
                    }
                });
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            requestsEmergencyStop() {
                return this.teamState.requestsEmergencyStopSince !== null;
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
