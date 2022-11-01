<template>
    <div>
        <table class="card-table">
            <tr>
                <th>Id</th>
                <th>Remaining time</th>
                <th>Cause</th>
                <th>Remove</th>
            </tr>
            <tr v-for="card of team.yellowCards" v-bind:key="card.id">
                <td>
                    {{card.id}}
                </td>
                <td>
                    <EditableLabelText
                            :id="'yellow-card-' + card.id"
                            :edit-mode="editMode"
                            :value="card.timeRemaining"
                            :callback="(v) => updateCardTime(v, card.id)"/>
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
    import EditableLabelText from "../common/EditableLabelText";

    export default {
        name: "TeamYellowCardsEditTable",
        components: {EditableLabelText},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateCardTime(v, cardId) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        yellowCard: {
                            id: cardId,
                            timeRemaining: v
                        }
                    }
                });
            },
            removeCard(cardId) {
                submitChange({
                    updateTeamStateChange: {
                        forTeam: this.teamColor,
                        removeYellowCard: cardId
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
