/**
 * Plugin to globally listen to Network
 * Decide if user is Online or Offline
 * Intercept "Install Web-App" notification
 */
export default (store) => {

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault() // Prevent the mini-infobar from appearing on mobile
    store.commit('settings/canInstallPrompt', e) // Stash the event to trigger later.
    window.Vue.$gtag.event('application_install_promoted') // Analytics: PWA install was promoted
  }, { once: true })

  window.addEventListener('online', () =>
    store.commit('app/setIsOnline', true)
  )

  window.addEventListener('offline', () =>
    store.commit('app/setIsOnline', false)
  )

}
