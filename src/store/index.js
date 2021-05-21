import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app'
import user from '@/store/modules/user'
import settings from '@/store/modules/settings'

import { plugin as userPlugin } from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  devtools: process.env.NODE_ENV !== 'production',
  strict: true,
  plugins: [
    userPlugin
  ],
  modules: {
    app,
    user,
    settings,
  },
})