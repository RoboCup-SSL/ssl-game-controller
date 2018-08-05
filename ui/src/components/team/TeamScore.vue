<template>
    <EditableLabelNumber
            :label="'Goals: '"
            :title="'Number of goals'"
            :value="score"
            :callback="updateGoals"
            :min="0"
            :max="99"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamScore",
        components: {EditableLabelNumber},
        props: {
            score: Number,
            teamColor: String
        },
        methods: {
            updateGoals: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'goals': Number(v)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>