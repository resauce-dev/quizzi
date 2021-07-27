/**
 * Stored State Data
 */
const state = {
  list: [
    { title: 'Commitment',
      desc: 'Turn notificatons on for game-reminders',
      getter: 'isNotifyEnabled',
      threshold: 1,
    },
    { title: 'Baby Steps',
      desc: 'Complete your first Question',
      getter: 'questionsCompleted',
      threshold: 1,
    },
    { title: 'Junior Quizzer',
      desc: 'Complete 10 Questions',
      getter: 'questionsCompleted',
      threshold: 10,
    },
  ]
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  list: state => state.list,
  questionsCompleted: (state, getters, rootState) => {
    const interactions = rootState.questions.interactions
    return [].concat(...Object.values(interactions).map(ans => 
      Object.values(ans).map(i=>i.isCorrect)
    )).filter(i=>i).length
  },
  isNotifyEnabled: (state, getters, rootState, rootGetters) => {
    return rootGetters['settings/isNotifyStatus']('granted') ? 1 : 0
  }
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
