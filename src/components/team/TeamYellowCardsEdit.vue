<template>
        <span class="edit-link">
            <a v-b-modal="modalId" v-if="editMode.active">
                <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
            </a>
            <b-modal :id="modalId"
                     :title="'Yellow Cards for team ' + teamColor"
                     :lazy="true">
                <TeamYellowCardsEditTable :edit-mode="{active: true}" :team-color="teamColor"/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>
        </span>
</template>

<script>
    import EditableLabelDuration from "../common/EditableLabelDuration";
    import TeamYellowCardsEditTable from "./TeamYellowCardsEditTable";
    import {TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "TeamYellowCardsEdit",
        components: {TeamYellowCardsEditTable, EditableLabelDuration},
        props: {
            teamColor: String,
            editMode: Object,
        },
        data() {
            return {
                TEAM_YELLOW: TEAM_YELLOW,
                TEAM_BLUE: TEAM_BLUE
            }
        },
        computed: {
            modalId() {
                return `yellow-cards-${this.teamColor}-modal`;
            },
        }
    }
</script>

<style scoped>
    .edit-link {
        margin-left: 0.3em;
    }
</style>
