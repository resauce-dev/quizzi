/**
 * Stored State Data
 */
const state = {
  appName: 'Quizzi',
  apiUrl: 'https://cms.resauce.dev'
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  appName: state => state.appName,
  apiUrl: state => state.apiUrl,
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
