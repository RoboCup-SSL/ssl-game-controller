<template>
    <div>
        <a class="btn-edit" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="canPlaceBall"/>
            <font-awesome-icon icon="toggle-off" v-if="!canPlaceBall"/>
        </a>
    </div>
</template>

<script>
    import {submitChange} from "@/submit";

    export default {
        name: "TeamBallPlacement",
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            edit: function () {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        canPlaceBall: !this.canPlaceBall
                    }
                });
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            canPlaceBall() {
                return this.teamState.canPlaceBall;
            }
        }
    }
</script>

<style scoped>
</style>
