/**
 * Stored State Data
 */
const state = {
  list: [
    { title: 'Baby Steps',
      desc: 'Complete your first Symbol!',
      getter: 'symbolsCompleted',
      threshold: 1,
    },
    { title: 'Junior Quizzer',
      desc: 'Complete 10 Symbols',
      getter: 'symbolsCompleted',
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
  symbolsCompleted: (state, getters, rootState) => {
    const interactions = rootState.questions.interactions
    return [].concat(...Object.values(interactions).map(ans => 
      Object.values(ans).map(i=>i.isCorrect)
    )).filter(i=>i).length
  },
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
