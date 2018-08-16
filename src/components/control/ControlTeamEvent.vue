<template>
    <div class="container">
        <span v-b-tooltip.hover
              v-for="event in events"
              :key="event.key"
              :title="event.title">
            <b-button v-on:click="send('stop')"
                      v-bind:disabled="false">
                {{event.name}}
            </b-button>
        </span>
    </div>
</template>

<script>
    export default {
        name: "ControlTeamEvent",
        props: {
            teamColor: String,
            events: {
                type: Array,
                default: function () {
                    return [
                        {key: 'BALL_LEFT_FIELD', name: 'BALL_LEFT_FIELD', title: ''},
                        {key: 'GOAL', name: 'GOAL', title: ''},
                        {key: 'KICK_TIMEOUT', name: 'KICK_TIMEOUT', title: ''},
                        {key: 'NO_PROGRESS_IN_GAME', name: 'NO_PROGRESS_IN_GAME', title: ''},
                        {key: 'BOT_COLLISION', name: 'BOT_COLLISION', title: ''},
                        {key: 'MULTIPLE_DEFENDER', name: 'MULTIPLE_DEFENDER', title: ''},
                        {key: 'MULTIPLE_DEFENDER_PARTIALLY', name: 'MULTIPLE_DEFENDER_PARTIALLY', title: ''},
                        {key: 'ATTACKER_IN_DEFENSE_AREA', name: 'ATTACKER_IN_DEFENSE_AREA', title: ''},
                        {key: 'ICING', name: 'ICING', title: ''},
                        {key: 'BALL_SPEED', name: 'BALL_SPEED', title: ''},
                        {key: 'ROBOT_STOP_SPEED', name: 'ROBOT_STOP_SPEED', title: ''},
                        {key: 'BALL_DRIBBLING', name: 'BALL_DRIBBLING', title: ''},
                        {key: 'ATTACKER_TOUCH_KEEPER', name: 'ATTACKER_TOUCH_KEEPER', title: ''},
                        {key: 'DOUBLE_TOUCH', name: 'DOUBLE_TOUCH', title: ''},
                        {key: 'ATTACKER_TO_DEFENCE_AREA', name: 'ATTACKER_TO_DEFENCE_AREA', title: ''},
                        {key: 'DEFENDER_TO_KICK_POINT_DISTANCE', name: 'DEFENDER_TO_KICK_POINT_DISTANCE', title: ''},
                        {key: 'BALL_HOLDING', name: 'BALL_HOLDING', title: ''},
                        {key: 'INDIRECT_GOAL', name: 'INDIRECT_GOAL', title: ''},
                        {key: 'BALL_PLACEMENT_FAILED', name: 'BALL_PLACEMENT_FAILED', title: ''},
                        {key: 'CHIP_ON_GOAL', name: 'CHIP_ON_GOAL', title: ''},
                    ]
                }
            }
        },
        methods: {
            send: function (command) {
                this.$socket.sendObj({'command': {'commandType': command}})
            }
        },
    }
</script>

<style scoped>
    button {
        margin: 0.1em;
    }

    .container {
        display: flex;
        flex-direction: column;
    }
</style>