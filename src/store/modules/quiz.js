import Vue from 'vue'
import { Quiz } from '@/quizzes/classes'
import { stripSpaces } from '@/quizzes/methods'
/**
 * Stored State Data
 */
const state = {
  quizzes: {}
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  getQuizIds: (state) => Object.keys(state.quizzes),
  getQuizList: (state) => Object.values(state.quizzes),
  getQuiz: (state) => (quiz_id) => state.quizzes[quiz_id],
  hasQuizIndex: (state, getters) => getters.getQuizIds.length > 0,
  getQuestions: (state, getters) => (quiz_id) => getters.getQuiz(quiz_id).questions,
  getQuestionCount: (state, getters) => (quiz_id) => getters.getQuestions(quiz_id).length,
  getQuestionIndex: (state, getters) => (quiz_id, question_id) => getters.getQuestions(quiz_id).map(q => q.id).indexOf(question_id),
  getQuestionById: (state, getters) => (quiz_id, question_id) => getters.getQuestion(quiz_id, getters.getQuestionIndex(quiz_id, question_id)),
  getQuestion: (state, getters) => (quiz_id, question_index) => getters.getQuestions(quiz_id)[question_index],
  getCorrectAnswersList: () => { 
    const list = JSON.parse(localStorage.getItem('completedSymbols')) 
    if(!list) localStorage.setItem('completedSymbols', JSON.stringify([]))
    return list
  },
  isQuestionCorrect: (state, getters) => (quiz_id, question_id, given_answer = '') => {
    if(!quiz_id || !question_id) throw "Missing parameter"
    if(getters.getCorrectAnswersList.indexOf(question_id) > -1) return true

    if(stripSpaces(getters.getQuestionById(quiz_id, question_id).name) === given_answer) {
      const correctAnswersList = getters.getCorrectAnswersList
      correctAnswersList.push(question_id)
      localStorage.setItem('completedSymbols', JSON.stringify(correctAnswersList))
      return true
    }

    return false
  },
  isDownloaded: (state, getters) => (quiz_id) => getters.getQuestions(quiz_id).length > 0,
  isQuizState: (state, getters) => (quiz_id, status) => getters.getQuizState(quiz_id) === status,
  isQuizCompleted: (state, getters) => (quiz_id) => getters.getQuestionCount(quiz_id) === getters.getQuizCorrectAnswerCount(quiz_id),
  getQuizCorrectAnswerCount: (state, getters) => (quiz_id) => {
    const questions = getters.getQuestions(quiz_id)
    const completedQuestions = JSON.parse(localStorage.getItem('completedSymbols'))
    let correctCount = 0;
    questions.forEach(q => completedQuestions.includes(q.id) ? correctCount++ : null)
    return correctCount
  },
  getQuizState: (state, getters) => (quiz_id) => {
    if(getters.getQuizCorrectAnswerCount(quiz_id) === 0)
      return 'not-started'
    else if(getters.getQuizCorrectAnswerCount(quiz_id) === getters.getQuestionCount(quiz_id))
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
  setQuizQuestions(state, {id, questions}) {
    let quizSymbolIds = state.quizzes[id].questions.map(s => s.id)
    questions.forEach(sym => {
      if(quizSymbolIds.indexOf(sym.id) < 0) { state.quizzes[id].addSymbol(sym) }
    })
  },
  setQuizzes(state, quizzes) {
    quizzes.forEach(q => {
      if(!(q.id in state.quizzes)) { Vue.set(state.quizzes, q.id, new Quiz(q)) } // create new quiz object if it doesnt exist already
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
      const cache = await caches.open(`quiz-index`)
      cache.add(url)

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
      const cache = await caches.open(`quiz__${id}`)
      cache.add(url)

      var response = await fetch(url)
      var { data } = await response.json()

      // Commit the result
      console.info('📜 Fetched Quiz', data.name, data)
      commit('setQuizQuestions', {id: data.id, questions: data.questions})
      return true
    } catch (e) {
      console.error('📜 Something went wrong!', e)
      return false
    }
  },
  async fetchQuizAssets({ state, rootGetters }, id) {
    const cache = await caches.open(`quiz__${id}`)
    const assetLinks = state.quizzes[id].questions.map(
      i => `${rootGetters['app/apiUrl']}/assets/${i.image.id}`
    )
    cache.addAll(assetLinks)
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
