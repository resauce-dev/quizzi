/**
 * Stored State Data
 */
const state = {
  isOnline: window.navigator.onLine
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  isOnline: state => state.isOnline 
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setIsOnline(state, bool) {
    console.info(`🖥 Internet ${bool?'Online':'Offline'}`)
    return state.isOnline = bool
  }
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
 */
export const plugin = store => {
  window.addEventListener('online', () => 
    store.commit('user/setIsOnline', true)
  );
  window.addEventListener('offline', () => 
    store.commit('user/setIsOnline', false)
  );
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}