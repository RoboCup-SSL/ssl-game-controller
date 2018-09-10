import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class TeamState {
    name = 'someone';
    goals = 0;
    goalie = 0;
    yellowCards = 0;
    yellowCardTimes = [];
    redCards = 0;
    timeoutsLeft = 4;
    timeoutTimeLeft = 300;
    onPositiveHalf = true;
    foulCounter = 0;
    ballPlacementFailures = 0;
    canPlaceBall = true;
}

export class RefBoxState {
    stage = 'unknown';
    command = 'unknown';
    commandForTeam = '';
    gameEvent = {type: '', ForTeam: '', Details: {}};
    stageTimeElapsed = 0;
    stageTimeLeft = 0;
    matchDuration = 0;
    teamState = {'Yellow': new TeamState(), 'Blue': new TeamState()};
    division = 'Div A';
}

export default new Vuex.Store({
    state: {
        refBoxState: new RefBoxState(),
        gameEvents: []
    },
    mutations: {
        SOCKET_ONOPEN() {
        },
        SOCKET_ONCLOSE() {
        },
        SOCKET_ONERROR() {
        },
        SOCKET_ONMESSAGE(state, message) {
            if (message.state != null) {
                state.refBoxState = message.state;
            }
            if (message.gameEvents) {
                state.gameEvents = message.gameEvents;
            }
        },
        SOCKET_RECONNECT() {
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});