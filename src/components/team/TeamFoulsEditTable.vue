<template>
    <div>
        <table>
            <tr>
                <th>Id</th>
                <th>Cause</th>
                <th>Remove</th>
            </tr>
            <tr v-for="foul of team.fouls" v-bind:key="foul.id">
                <td>
                    {{foul.id}}
                </td>
                <td>
                    <span v-if="foul.causedByGameEvent">
                        {{foul.causedByGameEvent.type}}
                    </span>
                    <span v-else>
                        -
                    </span>
                </td>
                <td>
                    <a class="btn-remove" v-on:click="removeFoul(foul.id)">
                        <font-awesome-icon
                                class="fa-xs"
                                icon="times-circle"/>
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {submitChange} from "@/submit";

    export default {
        name: "TeamFoulsEditTable",
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            removeFoul(id) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        removeFoul: id
                    }
                });
            }
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
    }
</style>
