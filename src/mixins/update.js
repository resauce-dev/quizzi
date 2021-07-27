export default {
  data() {
    // refresh variables
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      isFetchingUpdateContent: false,
      isUpdateInstallable: false,
      isUpdating: false,
      registration: null,
    }
  },

  created() {
    /**
     * Is the SW downloading new content?
     */
    document.addEventListener('swUpdateFound', () => {
      this.isFetchingUpdateContent = true
    }, { once: true })

    /**
     * Store the SW registration so we can send it a message
     * We use `isUpdateInstallable` to display there is an update 
     * the user needs to refresh for
     */
    document.addEventListener('swUpdated', event => {
      this.registration = event.detail
      this.isFetchingUpdateContent = false
      this.isUpdateInstallable = true
    }, { once: true })

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.isUpdating) return
      this.isUpdating = true
      window.location.reload()
    })
  },

  methods: {
    // Called when the user accepts the update
    refreshApp() {
      // Update is about to be installed
      this.isUpdateInstallable = false

      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })

      // Send a google-analytics event that an update occured
      this.$gtag.event('application_updated')
    }
  },
}