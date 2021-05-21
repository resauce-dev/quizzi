/**
 * Stored State Data
 */
const state = {
  appName: 'Quizzi',
  apiUrl: 'https://cms.resauce.dev',
  isOnline: window.navigator.onLine,
  installPrompt: null,
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  appName: state => state.appName,
  apiUrl: state => state.apiUrl,
  isOnline: state => state.isOnline,
  installPrompt: state => state.installPrompt,
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
  },
  setInstallPrompt(state, e) {
    return state.installPrompt = e
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
    store.commit('app/setIsOnline', true)
  );
  window.addEventListener('offline', () => 
    store.commit('app/setIsOnline', false)
  );
  window.addEventListener('beforeinstallprompt', e => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later.
    store.commit('app/setInstallPrompt', e)
    // Optionally, send analytics event that PWA install promo was shown.
  });
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
