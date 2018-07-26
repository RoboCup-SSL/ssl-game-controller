<template>
    <div class="team-timeouts">
        <EditableLabelNumber
                label="Timeouts left: "
                :value="timeoutsLeft"
                :callback="updateTimeoutsLeft"
                :min="0"
                :max="4"/>
        <p>Timeout time left: <span v-format-ns-duration="timeoutTimeLeft"></span></p>
    </div>
</template>

<script>
    import EditableLabelNumber from "../common/EditableLabelNumber";

    export default {
        name: "TeamTimeouts",
        components: {EditableLabelNumber},
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
                        'modifyType': 'timeoutsLeft',
                        'valueInt': Number(v)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>