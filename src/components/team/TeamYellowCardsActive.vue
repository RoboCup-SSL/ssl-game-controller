<template>
    <div>
        <span v-b-tooltip.hover.d500
              title="Active yellow cards">
            {{activeYellowCards.length}}
        </span>
        |
        <span v-b-tooltip.hover.d500
              title="Next yellow card due"
              v-format-ns-duration="latestCardTime">
        </span>

        <span class="edit-link">
            <a v-b-modal="modalId" v-if="editMode.active">
                <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
            </a>
        </span>
        <b-modal :id="modalId"
                 title="Active Yellow Card Times"
                 :lazy="true">
            <p>
                Edit currently active cards for team {{teamColor}}:
            </p>
            <TeamYellowCardTimes :edit-mode="{active: true}" :team-color="teamColor"/>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </div>
</template>

<script>
    import EditableLabelDuration from "../common/EditableLabelDuration";
    import TeamYellowCardTimes from "./TeamYellowCardTimes";
    import {TEAM_BLUE, TEAM_YELLOW} from "../../refereeState";
    import {submitChange} from "../../submit";

    export default {
        name: "TeamYellowCardsActive",
        components: {TeamYellowCardTimes, EditableLabelDuration},
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
        methods: {
            updateCardTime: function (duration, index) {
                // TODO
                submitChange({
                    updateTeamState: {
                        forTeam: this.teamColor,
                        yellowCard: {
                            id: index,
                            timeRemaining: duration
                        }
                    }
                });
            },
        },
        computed: {
            team() {
                return this.$store.state.matchState.teamState[this.teamColor]
            },
            latestCardTime() {
                if (this.activeYellowCards.length > 0) {
                    return this.activeYellowCards[0].timeRemaining;
                }
                return 0;
            },
            modalId() {
                return `yellow-card-times-${this.teamColor}-modal`;
            },
            activeYellowCards() {
                return this.team.yellowCards.filter(e => e.timeRemaining !== '0s');
            }
        }
    }
</script>

<style scoped>
    .edit-link {
        margin-left: 0.3em;
    }
</style>
