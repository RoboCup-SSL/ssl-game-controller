import Vue from "vue";
import Vuex from "vuex";
import {GameControllerState, State} from "./proto";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        gcState: GameControllerState.create(),
        matchState: State.create(),
        protocol: [],
        initialized: false
    },
    mutations: {
        SOCKET_ONOPEN(state) {
            state.protocol = []
        },
        SOCKET_ONCLOSE() {
        },
        SOCKET_ONERROR() {
        },
        SOCKET_ONMESSAGE(state, message) {
            if (message.protocol) {
                state.protocol = message.protocol.concat(state.protocol);
            }
            if (message.gcState) {
                state.gcState = message.gcState;
            }
            if (message.matchState) {
                state.matchState = message.matchState;
                state.initialized = true;
            }
        },
        SOCKET_RECONNECT(state) {
            state.protocol = []
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});
