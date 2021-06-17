export default {
  async created() {
    /**
     * If there's a service worker 
     * and notifications are enabled 
     * and time-triggers work
     */
    const swRegistration = await navigator.serviceWorker.getRegistration()
    const triggersAreEnabled = 'showTrigger' in Notification.prototype
    if (swRegistration && triggersAreEnabled) {

      /**
       * Now the app is open.
       * Don't send any scheduled notifications from when the app was closed.
       */
      const appClosedNotifications = await swRegistration.getNotifications({
        tag: 'app-closed',
        includeTriggered: true
      })
      appClosedNotifications.forEach(notification => notification.close())
      
      /**
       * When the app is closed, prepare a notification,
       * ask the user to finish their game
       * in one-hour's time if it's in-progress
       */
      window.addEventListener('beforeunload', async () => {
        const canNotifyUser = this.$store.getters['settings/isNotifyStatus']('granted')
        if(!canNotifyUser) return
        const lastPlayedQuizId = this.$store.getters['app/lastPlayedQuiz']
        if(!lastPlayedQuizId) return
        const quizInProgress = this.$store.getters['quiz/isQuizState'](lastPlayedQuizId, 'in-progress')
        if(!quizInProgress) return
        
        console.log('lastPlayedQuizId', lastPlayedQuizId)
        
        const quiz = this.$store.getters['quiz/getQuiz'](lastPlayedQuizId)
        const questionCount = this.$store.getters['quiz/getQuestionCount'](lastPlayedQuizId)
        const correctCount = this.$store.getters['questions/countCorrectAnswers'](lastPlayedQuizId)
        const swRegistration = await navigator.serviceWorker.getRegistration()
        swRegistration.showNotification(`Finish the ${quiz.name} quiz`, {
          tag: 'app-closed',
          body: `You've completed ${correctCount}/${questionCount} questions, almost there!`,
          showTrigger: new window.TimestampTrigger(Date.now() + ((60 * 1000) * 60)), // One Hour
        })
      })
      
    } else {
      console.info('👷‍♂️ Unable to trigger timed-notification due to system limitations')
    }
  }
}
