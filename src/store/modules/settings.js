/**
 * Stored State Data
 */
const state = {
  canVibrate: false,
  canPlayAudio: false,
  canInstall: null,
  notifyStatus: Notification.permission,
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  canVibrate: state => state.canVibrate,
  canPlayAudio: state => state.canPlayAudio,
  canInstall: state => state.canInstall,
  getNotifyStatus: state => state.notifyStatus,
  isNotifyStatus: state => status => state.notifyStatus === status,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  toggleCanVibrate: state => state.canVibrate = !state.canVibrate,
  toggleCanPlayAudio: state => state.canPlayAudio = !state.canPlayAudio,
  canInstallPrompt: (state, e) => state.canInstall = e,
  notifyStatus: (state, e) => state.notifyStatus = e,
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  requestNotifyPermission: async ({ getters, commit }) => {
    commit('notifyStatus', await Notification.requestPermission())
    console.info(`🎫 User ${getters.canSendNotifications} access to notifications`)
    this.$gtag.event(`application_notifications_${getters.canSendNotifications}`) // Analytics: User enabled notifications
  }
}

export const plugin = store => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault() // Prevent the mini-infobar from appearing on mobile
    store.commit('settings/canInstallPrompt', e) // Stash the event so it can be triggered later.
    this.$gtag.event('application_install_promoted') // Analytics: PWA install was promoted
  })
}

export default {
  namespaced: true,
  strict: true,
  state,
  getters,
  mutations,
  actions,
}
