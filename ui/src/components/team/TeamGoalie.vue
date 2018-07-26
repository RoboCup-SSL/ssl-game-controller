<template>
    <div class="team-goalie">
        <EditableLabelNumber
                :label="'Goalie-ID: '"
                :title="'The goalie number'"
                :value="goalie"
                :callback="updateGoalie"
                :min="0"
                :max="15"/>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamGoalie",
        components: {EditableLabelNumber},
        props: {
            teamColor: String,
            goalie: Number
        },
        methods: {
            updateGoalie: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'modifyType': 'goalie',
                        'valueInt': Number(v)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>