<template>
    <div class="team-timeouts">
        <EditableLabelNumber
                label="Timeouts left: "
                :value="timeoutsLeft"
                :callback="updateTimeoutsLeft"
                :min="0"
                :max="4"/>
        Timeout time left:
        <EditableLabelDuration
                :value="timeoutTimeLeft"
                :callback="updateTimeoutTimeLeft"/>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";
    import EditableLabelDuration from "../common/EditableLabelDuration";

    export default {
        name: "TeamTimeouts",
        components: {EditableLabelDuration, EditableLabelNumber},
        props: {
            teamColor: String,
            timeoutsLeft: Number,
            timeoutTimeLeft: Number
        },
        methods: {
            updateTimeoutsLeft: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'timeoutsLeft': Number(v)
                    }
                })
            },
            updateTimeoutTimeLeft: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'timeoutTimeLeft': v
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>