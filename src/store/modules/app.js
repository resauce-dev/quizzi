/**
 * Stored State Data
 */
const state = {
  apiUrl: 'https://cms.resauce.dev',
  isOnline: window.navigator.onLine,
  lastPlayedQuiz: null,
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  apiUrl: state => state.apiUrl,
  isOnline: state => state.isOnline,
  lastPlayedQuiz: state => state.lastPlayedQuiz,
  getApiAsset: (state, getters) => imageId => `${getters['apiUrl']}/assets/${imageId}?fit=contain&height=200&quality=90`,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setIsOnline: (state, bool) => state.isOnline = bool,
  setLastPlayedQuiz: (state, quiz_id) => state.lastPlayedQuiz = quiz_id,
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  playSound: ({ rootGetters }, sound) => {
    if(!rootGetters['settings/canPlayAudio']) return
    return (new Audio(`/audio/${sound}.wav`)).play()
  },
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
