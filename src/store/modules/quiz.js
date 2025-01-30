import quizzes from "../../quizzes/index.js"

/**
 * Stored State Data
 */
const state = {
  quizzes: {},
  quizzesMeta: {},
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  getQuizIds: (state) => Object.keys(state.quizzes),
  getQuizList: (state) => Object.values(state.quizzes),
  getQuizListCount: (state, getters) => getters.getQuizIds.length,
  hasQuizIndex: (state, getters) => getters.getQuizListCount > 0,
  getQuiz: (state) => (quiz_id) => state.quizzes[quiz_id],
  getQuestions: (state, getters) => (quiz_id) => getters.getQuiz(quiz_id).questions,
  getQuestionCount: (state) => (quiz_id) => state.quizzesMeta[quiz_id] ? state.quizzesMeta[quiz_id].quizLength : 0,
  getQuestionIndex: (state, getters) => (quiz_id, question_id) => getters.getQuestions(quiz_id).map(q => q.id).indexOf(question_id),
  getQuestionById: (state, getters) => (quiz_id, question_id) => getters.getQuestion(quiz_id, getters.getQuestionIndex(quiz_id, question_id)),
  getQuestion: (state, getters) => (quiz_id, question_index) => getters.getQuestions(quiz_id)[question_index],
  isDownloaded: (state, getters) => (quiz_id) => getters.getQuestions(quiz_id).length > 0,
  isCached: (state, getters) => (quiz_id) => getters.getQuestionCount(quiz_id) > 0,
  isQuizState: (state, getters) => (quiz_id, status) => getters.getQuizState(quiz_id) === status,
  isQuizCompleted: (state, getters, rootState, rootGetters) => (quiz_id) => getters.getQuestionCount(quiz_id) === rootGetters['questions/countCorrectAnswers'](quiz_id),
  getQuizState: (state, getters, rootState, rootGetters) => (quiz_id) => {
    if (rootGetters['questions/countCorrectAnswers'](quiz_id) === 0)
      return 'not-started'
    else if (getters.isQuizCompleted(quiz_id))
      return 'completed'
    else
      return 'in-progress'
  },
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setQuiz(state, q) {
    state.quizzes[q.id] = {
      id: q.id,
      name: q.name,
      questions: q.questions
    }
    state.quizzesMeta[q.id] = {
      quizLength: q.questions.length
    }
  },
  setQuizzes(state, quizzes) {
    state['quizzes'] = []
    quizzes.forEach(q => {
      if ((q.id in state.quizzes)) return
      state.quizzes[q.id] = {
        id: q.id,
        name: q.name,
        questions: []
      }
    })
  }
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  async fetchQuizzes({ rootGetters, commit }) {
    commit('setQuizzes', quizzes)
  },
  async fetchQuiz({ rootGetters, commit }, id) {
    commit('setQuiz', quizzes.find(q => q.id === id))
  },
  async fetchQuizAssets({ state, rootGetters }, quizId) {
    if (window.Cache !== undefined) {
      const cache = await caches.open(`quiz__${quizId}`)
      const assetLinks = state.quizzes[quizId].questions.map(
        q => rootGetters['app/getImageAsset'](quizId, q)
      )
      cache.addAll(assetLinks)
    }
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
