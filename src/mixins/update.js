export default {
  data() {
    return {
      // refresh variables
      isDevelopment: process.env.NODE_ENV === 'development',
      isFetchingUpdateContent: false,
      refreshing: false,
      registration: null,
      isUpdatingApp: false
    }
  },

  computed: {
    isUpdateInstallable: {
      get() {
        /**
         * JSON Parse to get a boolean back rather than a string
         */
        let isUpdateAvailable = localStorage.getItem('updateAvailable')
        return isUpdateAvailable ? JSON.parse(isUpdateAvailable.toLowerCase()) : false
      },
      set(isInstallable) {
        return localStorage.setItem('updateAvailable', isInstallable)
      }
    }
  },

  created() {
    // Listen for our custom events from the SW registration

    // Is the SW downloading new content?
    document.addEventListener('swUpdating', () => {
      this.isFetchingUpdateContent = true
    }, { once: true })

    // Has the content been cached?
    document.addEventListener('swCached', () => {
      this.isFetchingUpdateContent = false
    }, { once: true })

    // Store the SW registration so we can send it a message
    // We use `isUpdateInstallable` to display there is an update 
    // the user needs to refresh for
    document.addEventListener('swUpdated', (event) => {
      this.isFetchingUpdateContent = false
      this.isUpdateInstallable = true
      this.registration = event.detail
    }, { once: true })

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
    // Called when the user accepts the update
    refreshApp() {
      this.isUpdateInstallable = false

      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return

      // Inform the frontend that we're doing an update.
      this.isUpdatingApp = true

      // Sent a google-analytics event that an update occured
      this.$gtag.event('application_updated')
      
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}