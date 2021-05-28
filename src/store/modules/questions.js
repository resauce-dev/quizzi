import Vue from 'vue'
import { stripSpaces } from '@/quizzes/methods'

class Interaction {
  constructor(i = {}) {
    this.isCorrect = i.isCorrect || false
    this.key_presses = i.key_presses || 0 // count
  }
}

/**
 * Stored State Data
 */
 const state = {
  active_question_id: null,
  active_quiz_id: null,
  interactions: {}
}

/**
 * Get State Data
 * 
 * @return state.data
 */
const getters = {
  /**
   * Get the details of the users interaction with this question
   */
  activeInteraction: (state) => {
    if(!state.active_quiz_id) throw "QuizID and QuestionID are required before accessing the active interaction"
    return new Interaction(state.interactions[state.active_quiz_id][state.active_question_id])
  },
  /**
   * Get the details of the active question
   */
  activeQuestion: (state, getters, rootState, rootGetters) => {
    return rootGetters['quiz/getQuestionById'](state.active_quiz_id, state.active_question_id)
  },
  /**
   * Check to see if the current question has been previously marked as correct
   */
   isActiveQuestionCorrect: (state, getters) => {
    return getters.activeInteraction.isCorrect
  },
  /**
   * Return the count of correct user answers
   */
  countCorrectAnswers: (state) => (quiz_id) => {
    return state.interactions[quiz_id] ? Object.values(state.interactions[quiz_id]).map(q => q.isCorrect).length : 0
  },
  /**
   * Has the user interacted with the supplied quiz question yet?
   */
   hasInteraction: (state) => (quiz_id, question_id) => {
    return state.interactions[quiz_id] ? (state.interactions[quiz_id][question_id] ? true : false) : false
  },
  /**
   * Check to see if the requested question has been previously marked as correct
   */
   isQuestionCorrect: (state, getters) => (quiz_id, question_id) => {
    if(quiz_id && question_id) {
      return getters.hasInteraction(quiz_id, question_id) ? state.interactions[quiz_id][question_id].isCorrect : false
    }
    return getters.activeInteraction.isCorrect
  },
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  setActiveQuizId: (state, id) => {
    const quiz_id = state.active_quiz_id = id
    if(!state.interactions[quiz_id]) Vue.set(state.interactions, quiz_id, {})
    return state.interactions[quiz_id]
  },
  setActiveQuestionId: (state, id) => {
    if(!state.active_quiz_id) throw "A QuizID is required before supplying a QuestionID"
    const quiz_id = state.active_quiz_id
    const question_id = state.active_question_id = id
    if(!state.interactions[quiz_id][question_id]) Vue.set(state.interactions[quiz_id], question_id, new Interaction())
    return state.interactions[quiz_id][question_id]
  },
  markCorrect: (state) => {
    if(!state.active_quiz_id || !state.active_question_id) throw "Can't proceed without a quiz_id and question_id"
    Vue.set(state.interactions[state.active_quiz_id][state.active_question_id], 'isCorrect', true)
    return state.interactions[state.active_quiz_id][state.active_question_id].isCorrect
  },
  incrementKeyPress: (state) => {
    if(!state.active_quiz_id || !state.active_question_id) throw "Can't proceed without a quiz_id and question_id"
    let newCount = state.interactions[state.active_quiz_id][state.active_question_id].key_presses + 1
    Vue.set(state.interactions[state.active_quiz_id][state.active_question_id], 'key_presses', newCount)
    return state.interactions[state.active_quiz_id][state.active_question_id].key_presses
  }
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  checkAnswer: ({ state, commit, rootGetters }, given_answer = '') => {
    const quiz_id = state.active_quiz_id
    const question_id = state.active_question_id
    const answer = stripSpaces(rootGetters['quiz/getQuestionById'](quiz_id, question_id).name)
    if(given_answer.toUpperCase() !== answer.toUpperCase()) return false
    return commit('markCorrect')
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
