import modules from './modules'
import plugins from './plugins'
import { createStore } from 'vuex'

export const store = createStore({
  devtools: process.env.NODE_ENV !== 'production',
  strict: true,
  plugins: plugins,
  modules: modules,
})