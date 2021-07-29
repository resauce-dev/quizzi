/**
 * Stored State Data
 */
const state = {
  apiUrl: 'https://cms.resauce.dev',
  isOnline: window.navigator.onLine,
  lastPlayedQuiz: null,
  loadedSounds: [],
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
  addSound: (state, {name, sound}) => state.loadedSounds[name] = sound
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  playSound: async ({ rootGetters, state, commit }, name) => {
    if(!rootGetters['settings/canPlayAudio']) return
    if(!state.loadedSounds[name]) {
      commit('addSound', {name, sound:new Audio(`/audio/${name}.wav`)})
    }
    let sound = state.loadedSounds[name]
    sound.pause();
    sound.currentTime = 0;
    return new Promise(res => {
      sound.play()
      sound.onended = res
    })
  },
  vibrate: async ({ rootGetters }, pattern = [50]) => {
    if(!rootGetters['settings/canVibrate']) return
    return window.navigator.vibrate(pattern)
  }
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
