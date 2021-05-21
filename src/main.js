import Vue from 'vue'
import VueGtag from 'vue-gtag'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './router/guard'
import './registerServiceWorker'

Vue.use(VueGtag, { 
  config: { id: "UA-167804735-1" } 
}, router)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
