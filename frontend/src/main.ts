import {createApp} from 'vue'
import App from './App.vue'
import {subscribeToLocalStorage} from "@/store/uiState";

import {createPinia} from "pinia";
import router from './router'
import {Quasar} from 'quasar'

import {control} from "@/plugins/control";

import "@/assets/main.css"

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(control)
  .use(Quasar, {
    config: {
      brand: {
        primary: '#a11a30',
        secondary: '#984447',
        accent: '#9C27B0',

        dark: '#07171a',
        'dark-page': '#374040',

        positive: '#21BA45',
        negative: '#C10015',
        info: '#1ad3ed',
        warning: '#ddb660'
      }
    }
  })
  .mount('#app')

subscribeToLocalStorage()
