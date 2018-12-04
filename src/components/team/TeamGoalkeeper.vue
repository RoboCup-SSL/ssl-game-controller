<template>
    <EditableLabelNumber
            label="Goalkeeper: "
            title="The goalkeeper number"
            :value="goalkeeper"
            :callback="updateGoalkeeper"
            :min="0"
            :max="15"/>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamGoalkeeper",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            goalkeeper: Number
        },
        methods: {
            updateGoalkeeper: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'goalkeeper': Number(v)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>