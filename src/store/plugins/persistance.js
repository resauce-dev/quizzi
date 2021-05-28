import VuexPersistence from 'vuex-persist'

export default (new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    let toSave = {
      settings: {
        canVibrate: state.settings.canVibrate,
        canPlayAudio: state.settings.canPlayAudio
      },
      quiz: {
        quizzesMeta: state.quiz.quizzesMeta
      }
    }
    
    if(state.settings.notifyStatus === 'disabled') {
      toSave.settings.notifyStatus = state.settings.notifyStatus
    }

    return toSave
  }
})).plugin