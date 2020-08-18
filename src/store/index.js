import Vue from 'vue'
import Vuex from 'vuex'
import quizzes from '@/quizzes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizzes: quizzes
  },
  getters: {
    getQuiz: (state) => (slug) => {
      return state.quizzes.find(q => q.slug === slug)
    },
    getQuizSymbol: (state) => (slug, symbolIndex) => {
      const quiz = state.quizzes.find(q => q.slug === slug)
      const symbol = quiz.symbols[symbolIndex]
      return symbol
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
