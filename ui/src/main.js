import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
import VueHotkey from 'v-hotkey'
import TimestampFormatter from "./TimestampFormatter";

// use hotkeys for binding keyboard keys to buttons and other components
Vue.use(VueHotkey);

export class TeamState {
    name = 'someone';
    score = 0;
    goalie = 1;
    yellowCards = 3;
    yellowCardTimes = [50, 60];
    redCards = 0;
    timeoutsLeft = 4;
    timeoutTimeLeft = 60;
    onPositiveHalf = true;
}

export class RefBoxState {
    stage = 'unknown';
    gameState = 'unknown';
    gameStateForTeam = null;
    gameTimeElapsed = 0;
    gameTimeLeft = 0;
    teamState = {'YELLOW': new TeamState(), 'BLUE': new TeamState()};
}


Vue.use(TimestampFormatter);


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
