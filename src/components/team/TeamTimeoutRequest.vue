<template>
    <div>
        <a class="btn-edit toggle-button" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="requestsTimeout"/>
            <font-awesome-icon icon="toggle-off" v-if="!requestsTimeout"/>
        </a>
    </div>
</template>

<script>
    import {submitChange} from "@/submit";

    export default {
        name: "TeamTimeoutRequest",
        props: {
            teamColor: String,
        },
        methods: {
            edit: function () {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        requestsTimeout: !this.requestsTimeout
                    }
                });
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            requestsTimeout() {
                return this.teamState.requestsTimeoutSince !== null;
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
