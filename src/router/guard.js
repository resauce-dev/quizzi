import router from './'
import store from '../store'

router.beforeEach(async (to, from, next)=>{
  /**
   * Fetch all quiz root data
   * Only if there is no data already.
   */
  if(!store.getters['quiz/hasQuizIndex']) {
    await store.dispatch('quiz/fetchQuizzes')
  }

  /**
   * Navigate to the home-page to select a valid quiz.
   * If we are on a quiz page
   * And we can't find the requested quiz
   */
   if('quiz' in to.params && !store.getters['quiz/getQuizIds'].includes(to.params.quiz)) {
    return next({path: '/quizzes', replace: true })
  }

  /**
   * Fetch the selected quiz data
   * Only if user is on a quiz related page
   * And the quiz is not downloaded
   */
  if('quiz' in to.params && !store.getters['quiz/isDownloaded'](to.params.quiz)) {
    await store.dispatch('quiz/fetchQuiz', to.params.quiz)
    await store.dispatch('quiz/fetchQuizAssets', to.params.quiz)
  }

  /**
   * Navigate to the quiz-page to select a valid quiz.
   * If we are on a question page
   * And we can't find the requested question
   */
  if('symbol' in to.params && to.params.symbol > store.getters['quiz/getQuestionCount'](to.params.quiz)) {
    return next({path: `/quizzes/${to.params.quiz}`, replace: true })
  }

  /**
   * Allow the users requested action
   */
  return next()
})