import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

import app from '@/store/modules/app'
import settings from '@/store/modules/settings'
import quiz from '@/store/modules/quiz'

import { plugin as appPlugin } from '@/store/modules/app'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// })

Vue.use(Vuex)

export default new Vuex.Store({
  devtools: process.env.NODE_ENV !== 'production',
  strict: true,
  plugins: [
    // vuexLocal.plugin,
    appPlugin
  ],
  modules: {
    app,
    settings,
    quiz,
  },
})