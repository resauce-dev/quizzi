import VuexPersistence from 'vuex-persist'

export default (new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    let toSave = {
      app: {
        lastPlayedQuiz: state.app.lastPlayedQuiz
      },
      settings: {
        canVibrate: state.settings.canVibrate,
        canPlayAudio: state.settings.canPlayAudio,
      },
      quiz: {
        quizzesMeta: state.quiz.quizzesMeta,
      },
      questions: {
        interactions: state.questions.interactions,
      }
    }
    
    /**
     * If browser notifications are granted
     * And the saved state is 'disabled'
     * Repopulate setting using the disabled preference
     */
    if(Notification.permission === 'granted' && state.settings.notifyStatus === 'disabled') {
      toSave.settings.notifyStatus = state.settings.notifyStatus
    }

    return toSave
  }
})).plugin