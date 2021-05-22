/**
 * Stored State Data
 */
const state = {
  apiUrl: 'https://cms.resauce.dev',
  isOnline: window.navigator.onLine,
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  apiUrl: state => state.apiUrl,
  isOnline: state => state.isOnline,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setIsOnline: (state, bool) => state.isOnline = bool,
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {

}

/**
 * Plugin to globally listen to Network
 * Decide if user is Online or Offline
 * Intercept "Install Web-App" notification
 */
 export const plugin = store => {
  window.addEventListener('online', () => 
    store.commit('app/setIsOnline', true)
  )
  window.addEventListener('offline', () => 
    store.commit('app/setIsOnline', false)
  )
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
