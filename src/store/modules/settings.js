/**
 * Stored State Data
 */
const state = {
  canVibrate: false,
  canPlayAudio: false,
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
  getNotifyStatus: state => state.notifyStatus,
  isNotifyStatus: state => status => state.notifyStatus === status,
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  toggleCanVibrate: state => state.canInstall = !state.canInstall,
  toggleCanPlayAudio: state => state.canPlayAudio = !state.canPlayAudio,
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
