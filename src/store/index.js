import modules from './modules'
import plugins from './plugins'
import { createStore } from 'vuex'

export const store = createStore({
  devtools: import.meta.env.DEV,
  strict: true,
  plugins: plugins,
  modules: modules,
})