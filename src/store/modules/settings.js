import Vue from 'vue'

/**
 * Stored State Data
 */
const state = {
  canVibrate: true,
  canPlayAudio: true,
  canInstall: false,
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
  toggleNotifyStatus: state => {
    if(state.notifyStatus === 'granted') {
      state.notifyStatus = 'disabled'
    } else if (state.notifyStatus === 'disabled') {
      state.notifyStatus = 'granted'
    }
    Vue.$gtag.event(`notifications_${state.notifyStatus}`) 
  },
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  requestNotifyPermission: async ({ commit }) => {
    commit('notifyStatus', await Notification.requestPermission())
    Vue.$gtag.event(`notifications_${state.notifyStatus}`)
  },
  toggleNotify: async ({ getters, commit, dispatch }) => {
    if(getters.isNotifyStatus('default')) {
      dispatch('requestNotifyPermission')
    } else {
      commit('toggleNotifyStatus')
    }
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
