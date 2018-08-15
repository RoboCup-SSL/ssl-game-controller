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
    botCollisions = 0;
    ballPlacementFailures = 0;
    botSpeedInfringements = 0;
}

export class RefBoxState {
    stage = 'unknown';
    gameState = 'unknown';
    gameStateForTeam = null;
    gameTimeElapsed = 0;
    gameTimeLeft = 0;
    matchDuration = 0;
    teamState = {'Yellow': new TeamState(), 'Blue': new TeamState()};
}

export default new Vuex.Store({
    state: {
        latestMessage: 'unknown',
        refBoxState: new RefBoxState(),
    },
    mutations: {
        SOCKET_ONOPEN() {
        },
        SOCKET_ONCLOSE() {
        },
        SOCKET_ONERROR() {
        },
        SOCKET_ONMESSAGE(state, message) {
            state.latestMessage = message;
            state.refBoxState = message;
        },
        SOCKET_RECONNECT() {
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});