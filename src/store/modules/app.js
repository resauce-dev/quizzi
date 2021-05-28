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

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
