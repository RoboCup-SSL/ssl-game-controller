<template>
    <div class="team-score">
        <EditableLabelNumber
                :label="'Goals: '"
                :title="'Number of goals'"
                :value="score"
                :callback="updateGoals"
                :min="0"
                :max="99"/>
    </div>
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
                        'modifyType': 'goals',
                        'valueInt': Number(v)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>