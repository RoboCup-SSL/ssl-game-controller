import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import VueNativeSock from 'vue-native-websocket'
// use hotkeys for binding keyboard keys to buttons and other components
import VueHotkey from 'v-hotkey'
// use Bootstrap for styling
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import TimestampFormatter from "./TimestampFormatter";

Vue.use(VueHotkey);
Vue.use(BootstrapVue);
Vue.use(TimestampFormatter);

export let isInNormalHalf = function (state) {
    return state.stage === 'First Half';
};

let wsAddress;
if (process.env.NODE_ENV === 'development') {
    // use the default backend port
    wsAddress = 'ws://localhost:8081/api/control';
} else {
    // UI and backend are served on the same host+port on production builds
    wsAddress = 'ws://' + window.location.hostname + ':' + window.location.port + '/api/control';
}

// Connect to the backend with a single websocket that communicates with JSON format and is attached to the store
Vue.use(VueNativeSock, wsAddress, {
    reconnection: true,
    format: 'json',
    store: store,
});

// create root vue
new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
