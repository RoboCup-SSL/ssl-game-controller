import Vue from 'vue'
import App from './App.vue'
import store from "./store";
// use a custom timestamp formatter from this project
import TimestampFormatter from "./TimestampFormatter";
// use hotkeys for binding keyboard keys to buttons and other components
import VueHotkey from 'v-hotkey'
// use Bootstrap for styling
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Use fontawesome to load some icons
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretSquareDown, faCaretSquareUp, faEdit, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// Connect to the backend with a single websocket that communicates with JSON format and is attached to the store
import VueNativeSock from 'vue-native-websocket'

Vue.use(TimestampFormatter);

Vue.use(VueHotkey);

Vue.use(BootstrapVue);

library.add(faEdit);
library.add(faCaretSquareDown);
library.add(faCaretSquareUp);
library.add(faToggleOn);
library.add(faToggleOff);
Vue.component('font-awesome-icon', FontAwesomeIcon);

let wsAddress;
if (process.env.NODE_ENV === 'development') {
    // use the default backend port
    wsAddress = 'ws://localhost:8081/api/control';
} else {
    // UI and backend are served on the same host+port on production builds
    wsAddress = 'ws://' + window.location.hostname + ':' + window.location.port + '/api/control';
}

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
