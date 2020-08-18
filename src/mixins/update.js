export default {
  data() {
    return {
      // refresh variables
      refreshing: false,
      registration: null,
      updateExists: this.getUpdateAvailable(),
      isUpdatingApp: false
    }
  },

  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // Prevent multiple refreshes
    if(navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        // Here the actual reload of the page occurs
        window.location.reload()
      })
    }
  },

  methods: {
    getUpdateAvailable() {
      /**
       * JSON Parse to get a boolean back rather than a string
       */
      let isUpdateAvailable = localStorage.getItem('updateAvailable')
      return isUpdateAvailable ? JSON.parse(isUpdateAvailable.toLowerCase()) : false
    },
    setUpdateAvailable(bool) {
      this.updateExists = bool
      return localStorage.setItem('updateAvailable', bool)
    },

    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable(event) {
      this.setUpdateAvailable(true)

      this.registration = event.detail
    },

    // Called when the user accepts the update
    refreshApp() {
      this.setUpdateAvailable(false)

      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return

      this.isUpdatingApp = true;
      this.$gtag.event('application_updated')
      
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}