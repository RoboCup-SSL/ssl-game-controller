import Vue from "vue";
import Vuex from "vuex";
import {Config, GcState, State} from "./proto";

Vue.use(Vuex);

const maxProtocolEntriesString = window.localStorage.getItem('maxProtocolEntries');
let maxProtocolEntries = 50;
if (maxProtocolEntriesString !== null) {
    maxProtocolEntries = parseInt(maxProtocolEntriesString);
} else {
    window.localStorage.setItem('maxProtocolEntries', maxProtocolEntries);
}

export default new Vuex.Store({
    state: {
        hoverHelpText: "",
        gcState: GcState.create(),
        matchState: State.create(),
        config: Config.create(),
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
                if (message.protocol.delta) {
                    state.protocol = message.protocol.entry.concat(state.protocol);
                } else {
                    state.protocol = message.protocol.entry;
                }
                if (state.protocol.length > maxProtocolEntries) {
                    state.protocol = state.protocol.slice(0, maxProtocolEntries);
                }
            }
            if (message.gcState) {
                state.gcState = message.gcState;
            }
            if (message.matchState) {
                state.matchState = message.matchState;
                state.initialized = true;
            }
            if (message.config) {
                state.config = message.config;
            }
        },
        SOCKET_RECONNECT(state) {
            state.protocol = []
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});
