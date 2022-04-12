import Vue from 'vue'

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
    if(rootGetters['questions/countCorrectAnswers'](quiz_id) === 0)
      return 'not-started'
    else if(getters.isQuizCompleted(quiz_id))
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
    Vue.set(state.quizzes, q.id, {
      id: q.id,
      name: q.name,
      questions: q.questions
    })
    state.quizzesMeta[q.id] = {
      quizLength: q.questions.length
    }
  },
  setQuizzes(state, quizzes) {
    Vue.set(state, 'quizzes', [])
    quizzes.forEach(q => {
      if((q.id in state.quizzes)) return
      Vue.set(state.quizzes, q.id, {
        id: q.id,
        name: q.name,
        questions: []
      })
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
    var url = new URL(`${rootGetters['app/apiUrl']}/items/quizzi_quizzes`)

    var params = {
      fields: [
        'id',
        'sort',
        'date_created',
        'date_updated',
        'name',
        // 'questions.id'
      ],
      'filter[status][_eq]': 'published'
    }

    url.search = new URLSearchParams(params).toString()

    try {
      if (window.Cache !== undefined) {
        const cache = await caches.open(`quiz-index`)
        cache.add(url)
      }

      var response = await fetch(url)
      var {data} = await response.json()

      console.info('📜 Fetched Quizzes', data)
      commit('setQuizzes', data)
      return true
    } catch (e) {
      console.error('📜 Something went wrong!', e)
      return false
    }
  },
  async fetchQuiz({ rootGetters, commit }, id) {
    var url = new URL(`${rootGetters['app/apiUrl']}/items/quizzi_quizzes/${id}`)

    var params = {
      fields: [
        'id',
        'sort',
        'date_created',
        'date_updated',
        'name',
        'questions.id',
        'questions.sort',
        'questions.date_created',
        'questions.date_updated',
        'questions.name',
        'questions.has_padding',
        'questions.image.id'
      ],
      'filter[status][_eq]': 'published',
      'deep[questions][_filter][status][_eq]': 'published'
    }

    url.search = new URLSearchParams(params).toString()

    try {
      if (window.Cache !== undefined) {
        const cache = await caches.open(`quiz__${id}`)
        cache.add(url)
      }

      var response = await fetch(url)
      var { data } = await response.json()

      // Commit the result
      console.info('📜 Fetched Quiz', data.name, data)
      commit('setQuiz', data)
      return true
    } catch (e) {
      console.error('📜 Something went wrong!', e)
      return false
    }
  },
  async fetchQuizAssets({ state, rootGetters }, id) {
    if (window.Cache !== undefined) {
      const cache = await caches.open(`quiz__${id}`)
      const assetLinks = state.quizzes[id].questions.map(
        i => rootGetters['app/getApiAsset'](i.image.id)
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
