export default {
  async created() {
    /**
     * Don't do anything 
     * If there's no service worker 
     * Or time-triggers don't work
     */
     const swRegistration = await navigator.serviceWorker.getRegistration()
     const triggersAreEnabled = 'showTrigger' in Notification.prototype
    if (!swRegistration || !triggersAreEnabled) {
      console.info('👷‍♂️ Scheduled Notifications: Disabled due to system limitations')
      return
    }

    /**
     * The app has been opened.
     * Cancel sending any notifications already scheduled to be sent.
     */
    const appClosedNotifications = await swRegistration.getNotifications({
      tag: 'app-closed',
      includeTriggered: true
    })
    appClosedNotifications.forEach(notification => notification.close())
    
    /**
     * When the app is closed, prepare a notification,
     * ask the user to finish their game in one-hour's time (if it's in-progress)
     */
    window.addEventListener('beforeunload', async () => {

      const canNotifyUser = this.$store.getters['settings/isNotifyStatus']('granted')
      if(!canNotifyUser) return

      const lastPlayedQuizId = this.$store.getters['app/lastPlayedQuiz']
      if(!lastPlayedQuizId) return

      const hasQuizzes = this.$store.getters['questions/getQuizListCount']
      const lastQuizIsInProgress = this.$store.getters['quiz/isQuizState'](lastPlayedQuizId, 'in-progress')

      if(hasQuizzes && lastQuizIsInProgress) { // Has quizzes and last one is in progress
        const quiz = this.$store.getters['quiz/getQuiz'](lastPlayedQuizId)
        const questionCount = this.$store.getters['quiz/getQuestionCount'](lastPlayedQuizId)
        const correctCount = this.$store.getters['questions/countCorrectAnswers'](lastPlayedQuizId)
        const swRegistration = await navigator.serviceWorker.getRegistration()
        swRegistration.showNotification(`Finish the ${quiz.name} quiz`, {
          tag: 'app-closed',
          body: `You've completed ${correctCount}/${questionCount} questions, almost there!`,
          showTrigger: new window.TimestampTrigger(Date.now() + ((60 * 1000) * 60)), // One Hour
        })
      } else if (hasQuizzes) { // The last quiz was not in progress
        swRegistration.showNotification(`Fancy another challenge?`, {
          tag: 'app-closed',
          body: `Come back and start a new quiz!`,
          showTrigger: new window.TimestampTrigger(Date.now() + ((60 * 1000) * 60)), // One Hour
        })
      }
      
    })
  }
}
