import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from "./store";
import TimestampFormatter from "./TimestampFormatter";
import VueHotkey from 'v-hotkey'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import * as fa from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueNativeSock from 'vue-native-websocket'
import './assets/css/style.css'
import Main from "./components/Main";
import Field from "./components/Field";
import GameController from "./components/GameController";

// use a custom timestamp formatter from this project
Vue.use(TimestampFormatter);
// use hotkeys for binding keyboard keys to buttons and other components
Vue.use(VueHotkey);
// use Bootstrap for styling
Vue.use(BootstrapVue);

library.add(
    fa.faEdit,
    fa.faToggleOn,
    fa.faToggleOff,
    fa.faSignal,
    fa.faCheckCircle,
    fa.faTimesCircle,
    fa.faShieldAlt,
    fa.faCog,
    fa.faHistory,
    fa.faInfoCircle,
    fa.faQuestionCircle,
    fa.faExclamationTriangle,
    fa.faTerminal,
    fa.faGavel,
    fa.faChessBoard,
    fa.faClock,
    fa.faExclamation,
    fa.faBullhorn,
    fa.faRecycle,
    fa.faFutbol,
    fa.faHandPointUp,
    fa.faStopCircle,
    fa.faPlayCircle,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

let wsAddress;
if (process.env.NODE_ENV === 'development') {
    // use the default backend port
    wsAddress = 'ws://localhost:8081/api/control';
} else {
    // UI and backend are served on the same host+port on production builds
    let protocol;
    if (window.location.protocol === 'http:') {
        protocol = 'ws:'
    } else {
        protocol = 'wss:'
    }
    wsAddress = protocol + '//' + window.location.hostname + ':' + window.location.port + '/api/control';
}

// Connect to the backend with a single websocket that communicates with JSON format and is attached to the store
Vue.use(VueNativeSock, wsAddress, {
    reconnection: true,
    format: 'json',
    store: store,
});

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/', component: GameController, children: [
                {
                    path: '',
                    component: Main
                },
                {
                    path: 'field',
                    component: Field
                }
            ]
        },
    ]
});

Vue.directive('help-text', {
    bind: function (el, binding) {
        el.__vHoverOver__ = (() => store.state.hoverHelpText = binding.value || '')
        el.__vHoverLeave__ = (() => store.state.hoverHelpText = '')

        // Add Event Listeners
        el.addEventListener('mouseover', el.__vHoverOver__)
        el.addEventListener('mouseleave', el.__vHoverLeave__)
    },
    unbind: function (el) {
        // Remove Event Listeners
        el.removeEventListener('mouseover', el.__vHoverOver__)
        el.removeEventListener('mouseleave', el.__vHoverLeave__)
        delete el.__vHoverOver__
        delete el.__vHoverLeave__
    }
});

// create root vue
// noinspection JSUnusedGlobalSymbols
export const vueApp = new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');
