<template>
    <div>
        <span v-b-tooltip.hover
              title="Active yellow cards">
            {{team.yellowCardTimes.length}}
        </span>
        |
        <span v-b-tooltip.hover
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

    export default {
        name: "TeamYellowCardsActive",
        components: {TeamYellowCardTimes, EditableLabelDuration},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateCardTime: function (v, index) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'yellowCardTime': {'cardID': index, 'duration': v}
                    }
                })
            },
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            latestCardTime() {
                if (this.team.yellowCardTimes.length > 0) {
                    return this.team.yellowCardTimes[0];
                }
                return 0;
            },
            modalId() {
                return `yellow-card-times-${this.teamColor}-modal`;
            },
        }
    }
</script>

<style scoped>
    .edit-link {
        margin-left: 0.3em;
    }
</style>
