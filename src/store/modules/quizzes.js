import Vue from 'vue'
import { Quiz } from '@/quizzes/classes'

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
  hasQuizzes: (state, getters) => {
    return getters.quizIds.length > 0
  },
  quizIds: state => {
    return Object.keys(state.quizzes)
  },
  quizzes: state => {
    return Object.values(state.quizzes)
  },
  getQuiz: state => id => {
    return state.quizzes[id]
  },
  getQuizSymbol: state => (id, symbolIndex) => {
    return state.quizzes[id].symbols[symbolIndex]
  }
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setQuizQuestions(state, {id, questions}) {
    let quizSymbolIds = state.quizzes[id].symbols.map(s => s.id)
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