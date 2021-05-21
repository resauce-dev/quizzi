/**
 * Stored State Data
 */
const state = {
  canVibrate: false,
  canPlayAudio: false,
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  canVibrate: state => state.canVibrate,
  canPlayAudio: state => state.canPlayAudio
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  toggleCanVibrate: (state, e) => state.canInstall = e,
  toggleCanPlayAudio: (state, e) => state.canInstall = e,
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
