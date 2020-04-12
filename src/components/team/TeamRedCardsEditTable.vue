<template>
    <div>
        <table class="card-table">
            <tr>
                <th>Id</th>
                <th>Cause</th>
                <th>Remove</th>
            </tr>
            <tr v-for="card of team.redCards" v-bind:key="card.id">
                <td>
                    {{card.id}}
                </td>
                <td>
                    <span v-if="card.causedByGameEvent">
                        {{card.causedByGameEvent.type}}
                    </span>
                    <span v-else>
                        -
                    </span>
                </td>
                <td>
                    <a class="btn-remove" v-on:click="removeCard(card.id)">
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
    import {submitChange} from "../../submit";

    export default {
        name: "TeamRedCardsEditTable",
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            removeCard(cardId) {
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        removeRedCard: cardId
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
    .card-table {
        width: 100%;
    }
</style>
