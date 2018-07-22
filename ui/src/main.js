import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'


export class TeamState {
    yellow_cards = 0;
    score = 0;
}

export class RefBoxState {
    gameStatus = 'unknown';
    gameTimeLeft = 0;
    team_state = {'YELLOW': new TeamState(), 'BLUE': new TeamState()};
}

// use Vuex for state management with the Vuex.Store
Vue.use(Vuex);
const store = new Vuex.Store({
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

// Connect to the backend with a single websocket that communicates with JSON format and is attached to the store
Vue.use(VueNativeSock, 'ws://localhost:8081/ws', {
    reconnection: true,
    format: 'json',
    store: store,
});

// create root vue
new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
