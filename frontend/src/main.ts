import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'

import {createPinia} from "pinia";
import router from './router'

import {control} from "@/plugins/control";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(control)
  .mount('#app')
