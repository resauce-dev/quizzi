import { store } from '@/store'

const guardBefore = async (to, from, next) => {
  /**
   * Fetch all quiz root data
   * Only if there is no data already.
   */
  if (!store.getters['quiz/hasQuizIndex']) {
    await store.dispatch('quiz/fetchQuizzes')
  }

  /**
   * Navigate to the home-page to select a valid quiz.
   * If we are on a quiz page
   * And we can't find the requested quiz
   */
  if ('quiz' in to.params && !store.getters['quiz/getQuizIds'].includes(to.params.quiz)) {
    return next({ path: '/quizzes', replace: true })
  }

  /**
   * Fetch the selected quiz data
   * Only if user is on a quiz related page
   * And the quiz is not downloaded
   */
  if ('quiz' in to.params && !store.getters['quiz/isDownloaded'](to.params.quiz)) {
    await store.dispatch('quiz/fetchQuiz', to.params.quiz)
    await store.dispatch('quiz/fetchQuizAssets', to.params.quiz)
  }

  /**
   * Store the active quiz-page
   * Only if user is on a quiz related page
   */
  if ('quiz' in to.params) {
    await store.commit('app/setLastPlayedQuiz', to.params.quiz)
  }

  /**
   * If we are on a question page
   * But the question is not a number
   * We should redirect the user to the quiz page.
   */
  if ('question' in to.params && isNaN(parseInt(to.params.question))) {
    return next({ path: `/quizzes/${to.params.quiz}`, replace: true })
  }

  /**
   * If we are on a question page
   * And we can't find the requested question
   * Navigate to the quiz-page to select a valid quiz.
   */
  if ('question' in to.params && to.params.question > store.getters['quiz/getQuestionCount'](to.params.quiz)) {
    return next({ path: `/quizzes/${to.params.quiz}`, replace: true })
  }

  /**
   * Allow the users requested action
   */
  return next()
}

const guardAfter = () => {
  if (!window.Vue) throw "Missing Vue Element"
  window.Vue.$el.scrollTo(0, 0)
}

export { guardBefore, guardAfter }