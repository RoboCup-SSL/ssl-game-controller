import {createApp} from 'vue'
import App from './App.vue'

import {createPinia} from "pinia";
import router from './router'
import {Quasar} from 'quasar'

import {control} from "@/plugins/control";

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
        primary: '#1ca3a3',
      }
    }
  })
  .mount('#app')
