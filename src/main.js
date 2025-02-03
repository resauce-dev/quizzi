import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'
import { createBootstrap } from 'bootstrap-vue-next'
import { store } from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './registerServiceWorker'
import './assets/main.css'

/**
 * Init Vue App
 */
window.Vue = createApp(App)
  .use(router)
  .use(createBootstrap())
  .use(store)
  .use(VueGtag, {
    enabled: process.env.NODE_ENV == "development" ? false : true,
    config: { id: 'UA-167804735-1' }
  }, router)
  .component('b-icon', FontAwesomeIcon)
  .mount('#app')
