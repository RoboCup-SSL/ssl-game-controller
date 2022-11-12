<template>
        <span class="edit-link">
            <a v-b-modal="modalId" v-if="editMode.active">
                <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
            </a>
            <b-modal :id="modalId"
                     :title="'Fouls for team ' + teamColor"
                     :lazy="true">
                <TeamFoulsEditTable :edit-mode="{active: true}" :team-color="teamColor"/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>
        </span>
</template>

<script>
    import {TEAM_BLUE, TEAM_YELLOW} from "@/refereeState";
    import EditableLabelDuration from "../common/EditableLabelDuration";
    import TeamFoulsEditTable from "./TeamFoulsEditTable";

    export default {
        name: "TeamFoulsEdit",
        components: {TeamFoulsEditTable, EditableLabelDuration},
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
                return `fouls-${this.teamColor}-modal`;
            },
        }
    }
</script>

<style scoped>
    .edit-link {
        margin-left: 0.3em;
    }
</style>
