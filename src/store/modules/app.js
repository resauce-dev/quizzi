/**
 * Stored State Data
 */
const state = {
  name: 'Quizzi',
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  appName: state => {
    return state.appName
  },
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
 const mutations = {

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
