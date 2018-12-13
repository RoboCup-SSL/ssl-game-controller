import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class TeamState {
    name = 'someone';
    goals = 0;
    goalkeeper = 0;
    yellowCards = 0;
    yellowCardTimes = [];
    redCards = 0;
    timeoutsLeft = 4;
    timeoutTimeLeft = 300;
    onPositiveHalf = true;
    foulCounter = 0;
    ballPlacementFailures = 0;
    canPlaceBall = true;
    maxAllowedBots = 0;
    connected = false;
    connectionVerified = false;
}

export class RefBoxState {
    stage = 'unknown';
    command = '';
    commandForTeam = '';
    gameEvents = [{type: '', details: {}}];
    stageTimeElapsed = 0;
    stageTimeLeft = 0;
    matchDuration = 0;
    teamState = {'Yellow': new TeamState(), 'Blue': new TeamState()};
    division = 'DivA';
    autoContinue = true;
    nextCommand = '';
    nextCommandFor = '';
    autoRefsConnected = [];
    gameEventBehavior = {};
    gameEventProposals = [{proposerId: '', gameEvent: {type: '', details: {foo: 'bar'}}, validUntil: 0}];
    currentActionTimeRemaining = 0;
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