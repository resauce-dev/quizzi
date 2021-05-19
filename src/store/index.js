import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
import { Quiz } from '@/quizzes/classes'
import domain from '@/domain'

Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

export default new Vuex.Store({
  // plugins: [vuexLocal.plugin],
  state: {
    quizzes: {}
  },
  getters: {
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
  },
  actions: {
    async fetchQuizzes({ commit }) {
      var url = new URL(`${domain}/items/quizzi_quizzes`)

      var params = {
        fields: [
          'id',
          'sort',
          'date_created',
          'date_updated',
          'name'
        ],
      }

      url.search = new URLSearchParams(params).toString();
  
      try {
        var response = await fetch(url);
        var data = await response.json();
        console.log('✔ Fetched Quizzes', data.data);
        commit('setQuizzes', data.data)
        return true
      } catch (e) {
        console.log('❌ Something went wrong!', e);
        return false
      }
    },
    async fetchQuiz({ commit }, id) {
      var url = new URL(`${domain}/items/quizzi_quizzes/${id}`)

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
      }

      url.search = new URLSearchParams(params).toString();
  
      try {
        var response = await fetch(url);
        var data = await response.json();
        console.log('✔ Fetched Quiz', data.data.name, data.data);
        commit('setQuizQuestions', {id: data.data.id, questions: data.data.questions})
        return true
      } catch (e) {
        console.log('❌ Something went wrong!', e);
        return false
      }
    },
  },
  mutations: {
    setQuizQuestions(state, {id, questions}) {
      let quizSymbolIds = state.quizzes[id].symbols.map(s => s.id)
      questions.forEach(sym => {
        if(quizSymbolIds.indexOf(sym.id) < 0) { state.quizzes[id].addSymbol(sym) }
      });
    },
    setQuizzes(state, quizzes) {
      quizzes.forEach(q => {
        if(!(q.id in state.quizzes)) { Vue.set(state.quizzes, q.id, new Quiz(q)) } // create new quiz object if it doesnt exist already
      });
    }
  },
  modules: {
  }
})
