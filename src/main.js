import Vue from 'vue'
import VueRouter from 'vue-router'
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
import {
    faCheckCircle,
    faTimesCircle,
    faEdit,
    faSignal,
    faToggleOff,
    faToggleOn,
    faShieldAlt,
    faCog,
    faHistory,
    faInfoCircle,
    faQuestionCircle,
    faExclamationTriangle,
    faTerminal,
    faGavel,
    faClock,
    faExclamation,
    faUsers,
    faBullhorn,
    faChessBoard,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// Connect to the backend with a single websocket that communicates with JSON format and is attached to the store
import VueNativeSock from 'vue-native-websocket'

import './assets/css/style.css'
import AutonomousControl from "./components/AutonomousControl";
import ManualControl from "./components/manual-control/ManualControl";
import Field from "./components/Field";

Vue.use(TimestampFormatter);

Vue.use(VueHotkey);

Vue.use(BootstrapVue);

Vue.use(VueRouter);

library.add(faEdit);
library.add(faToggleOn);
library.add(faToggleOff);
library.add(faSignal);
library.add(faCheckCircle);
library.add(faTimesCircle);
library.add(faShieldAlt);
library.add(faCog);
library.add(faHistory);
library.add(faInfoCircle);
library.add(faQuestionCircle);
library.add(faExclamationTriangle);
library.add(faTerminal);
library.add(faGavel);
library.add(faChessBoard);
library.add(faClock);
library.add(faExclamation);
library.add(faUsers);
library.add(faBullhorn);
Vue.component('font-awesome-icon', FontAwesomeIcon);


export let isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

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

const routes = [
    {path: '/autonomous', component: AutonomousControl},
    {path: '/field', component: Field},
    {path: '/manual', component: ManualControl},
    {path: '/', component: AutonomousControl},
];
const router = new VueRouter({
    routes
});

// create root vue
new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');
