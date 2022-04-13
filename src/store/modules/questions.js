import Vue from 'vue'
import Interaction from '@/quizzes/Interaction'
import { stripSpaces } from '@/quizzes/methods'

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
    return state.interactions[quiz_id] ? Object.values(state.interactions[quiz_id]).map(q => q.isCorrect).filter(i => i).length : 0
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
  /**
   * Given a question, find the next incomplete question.
   */
  nextIncompleteQuestionId: (state, getters, rootState, rootGetters) =>  (quiz_id, question_index, loopCount = 0) => {
    if(loopCount > 1) return null // Avoid infinite loop when no questions left incorrect.

    const questions = rootGetters['quiz/getQuiz'](quiz_id).questions

    let nextIncompleteQuestionIndex = null;
    for (let i = question_index; i < questions.length; i++) {
      const quizQuestion = questions[i];
      console.log(quiz_id, quizQuestion.id)
      const isCorrect = rootGetters['questions/isQuestionCorrect'](quiz_id, quizQuestion.id)
      if(isCorrect) continue
      nextIncompleteQuestionIndex = i
      break
    }

    if(!nextIncompleteQuestionIndex) {
      return getters['nextIncompleteQuestionId'](quiz_id, 0, loopCount + 1)
    }

    return nextIncompleteQuestionIndex + 1
  },
}

/**
 * Modify State Data
 * 
 * @return state.data
 */
const mutations = {
  /**
   * This is a dangerous mutation!
   * @returns 
   */
  setAllInteractions: (state, data) => {
    return state.interactions = data
  },
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
  },
  clearInteractions: (state) => {
    Vue.set(state, 'interactions', {})
    Vue.$gtag.event('gameplay_reset')
  }
}

/**
 * Store Triggers
 * 
 * @return commit()
 */
const actions = {
  checkAnswer: ({ state, commit, getters, rootGetters, dispatch }, given_answer = '') => {
    const quiz_id = state.active_quiz_id
    const question_id = state.active_question_id
    const answer = stripSpaces(rootGetters['quiz/getQuestionById'](quiz_id, question_id).name)
    if(given_answer.toUpperCase() !== answer.toUpperCase()) return false

    const isCorrect = commit('markCorrect')

    // if last question in array then play game_complete sound else play question_complete sound
    if (getters.countCorrectAnswers(quiz_id) >= rootGetters['quiz/getQuestionCount'](quiz_id)) {
      dispatch('app/playSound', 'game_complete', {root: true})
    } else {
      dispatch('app/playSound', 'question_complete', {root: true})
    }

    return isCorrect
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
