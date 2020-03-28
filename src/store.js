import Vue from "vue";
import Vuex from "vuex";
import {GameControllerState, State} from "./proto";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        gcState: GameControllerState.create(),
        matchState: new State(),
        protocol: [],
        initialized: false
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
                state.initialized = true;
            }
        },
        SOCKET_RECONNECT() {
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});
