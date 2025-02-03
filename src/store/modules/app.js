/**
 * Stored State Data
 */
const state = {
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
  isOnline: state => state.isOnline,
  lastPlayedQuiz: state => state.lastPlayedQuiz,
  getImageAsset: () => (quizId, question) => `/img/symbols/${quizId}/${question.image.id}.${question.image.extension}`,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setIsOnline: (state, bool) => state.isOnline = bool,
  setLastPlayedQuiz: (state, quiz_id) => state.lastPlayedQuiz = quiz_id,
  addSound: (state, { name, sound }) => state.loadedSounds[name] = sound
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  playSound: async ({ rootGetters, state, commit }, name) => {
    if (!rootGetters['settings/canPlayAudio']) return
    if (!state.loadedSounds[name]) {
      commit('addSound', { name, sound: new Audio(`/audio/${name}.wav`) })
    }
    let sound = state.loadedSounds[name]
    await sound.pause();
    sound.currentTime = 0;
    return new Promise(resolve => {
      sound.play().then(() => resolve)
    })
  },
  vibrate: async ({ rootGetters }, pattern = [50]) => {
    if (!rootGetters['settings/canVibrate']) return
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
