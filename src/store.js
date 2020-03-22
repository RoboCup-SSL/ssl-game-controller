import Vue from "vue";
import Vuex from "vuex";
import {TEAM_YELLOW} from "./refereeState";
import {TEAM_BLUE} from "./refereeState";

Vue.use(Vuex);

export class TeamState {
    name = 'someone';
    goals = 0;
    goalkeeper = 0;
    yellowCards = [];
    redCards = [];
    timeoutsLeft = 4;
    timeoutTimeLeft = 300;
    onPositiveHalf = true;
    fouls = [];
    ballPlacementFailures = 0;
    ballPlacementFailuresReached = false;
    canPlaceBall = true;
    maxAllowedBots = 0;
    botSubstitutionIntend = false;
}

export class MatchState {
    stage = 'unknown';
    command = '';
    commandForTeam = '';
    stageTimeElapsed = 0;
    stageTimeLeft = 0;
    matchDuration = 0;
    teamState = {[TEAM_YELLOW]: new TeamState(), [TEAM_BLUE]: new TeamState()};
    nextCommand = '';
    nextCommandFor = '';
    currentActionTimeRemaining = 0;
    gameEvents = [];
    proposedGameEvents = [];
    division = 'DivA';
    autoContinue = true;
    firstKickoffTeam = TEAM_YELLOW;
    gameEventBehavior = [];
}

export class GameControllerState {
    autoRefsConnected = [];
    teamConnected = {[TEAM_YELLOW]: false, [TEAM_BLUE]: false};
    teamConnectionVerified = {[TEAM_YELLOW]: false, [TEAM_BLUE]: false};
}

export class ProtocolEntry {
    id = 0;
    timestamp = 0;
    stageTime = 0;
    type = '';
    name = '';
    team = TEAM_YELLOW;
    description = '';
    previousState = null;
}

export default new Vuex.Store({
    state: {
        gcState: new GameControllerState(),
        matchState: new MatchState(),
        protocol: []
    },
    mutations: {
        SOCKET_ONOPEN() {
        },
        SOCKET_ONCLOSE() {
        },
        SOCKET_ONERROR() {
        },
        SOCKET_ONMESSAGE(state, message) {
            if (message.protocol) {
                state.protocol = message.protocol;
            }
            if (message.gcState) {
                state.gcState = message.gcState;
            }
            if (message.matchState) {
                state.matchState = message.matchState;
            }
        },
        SOCKET_RECONNECT() {
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});
