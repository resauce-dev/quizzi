/**
 * Stored State Data
 */
const state = {
  appName: 'Quizzi',
  apiUrl: 'https://cms.resauce.dev',
  isOnline: window.navigator.onLine,
  canInstall: null,
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
  canInstall: state => state.canInstall,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setIsOnline: (state, bool) => state.isOnline = bool,
  setCanInstallPrompt: (state, e) => state.canInstall = e
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
    e.preventDefault() // Prevent the mini-infobar from appearing on mobile
    store.commit('app/setCanInstallPrompt', e) // Stash the event so it can be triggered later.
    this.$gtag.event('application_install_promoted') // Send analytics event that PWA install was promoted
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
