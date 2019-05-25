<template>
    <EditableLabelNumber
            :edit-mode="editMode"
            :value="teamState.foulCounter"
            :callback="updateFoulCounter"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamFoulCounter",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            editMode: Object,
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            }
        },
        methods: {
            updateFoulCounter: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'foulCounter': Number(v)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
