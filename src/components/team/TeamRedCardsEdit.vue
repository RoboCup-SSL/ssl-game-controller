<template>
        <span class="edit-link">
            <a v-b-modal="modalId" v-if="editMode.active">
                <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
            </a>
            <b-modal :id="modalId"
                     :title="'Red Cards for team ' + teamColor"
                     :lazy="true">
                <TeamRedCardsEditTable :edit-mode="{active: true}" :team-color="teamColor"/>
                <div slot="modal-footer">
                    <!-- hide modal buttons -->
                </div>
            </b-modal>
        </span>
</template>

<script>
    import TeamRedCardsEditTable from "./TeamRedCardsEditTable";
    import {TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";

    export default {
        name: "TeamRedCardsEdit",
        components: {TeamRedCardsEditTable},
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
                return `red-cards-${this.teamColor}-modal`;
            },
        }
    }
</script>

<style scoped>
    .edit-link {
        margin-left: 0.3em;
    }
</style>
