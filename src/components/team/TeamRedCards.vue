<template>
    <EditableLabelNumber
            label="Red cards: "
            :value="redCards"
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
            redCards: Number
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
    }
</script>

<style scoped>
</style>