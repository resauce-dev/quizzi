import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

import app from '@/store/modules/app'
import user from '@/store/modules/user'
import settings from '@/store/modules/settings'
import quizzes from '@/store/modules/quizzes' // remove

import { plugin as userPlugin } from '@/store/modules/user'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// })

Vue.use(Vuex)

export default new Vuex.Store({
  devtools: process.env.NODE_ENV !== 'production',
  strict: true,
  plugins: [
    // vuexLocal.plugin,
    userPlugin
  ],
  modules: {
    app,
    user,
    settings,
    quizzes, // remove
  },
})