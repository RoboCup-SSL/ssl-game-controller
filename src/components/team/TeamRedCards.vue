<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="team.redCards"
            :callback="updateRedCards"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamRedCards",
        components: {EditableLabelDuration, EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            updateRedCards: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'redCards': Number(v)
                    }
                })
            },
        },
        computed: {
            team() {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
        }
    }
</script>

<style scoped>
</style>
