/**
 * Plugin to globally listen to Network
 * Decide if user is Online or Offline
 * Intercept "Install Web-App" notification
 */
export default store => {
  window.addEventListener('online', () => 
    store.commit('app/setIsOnline', true)
  )
  window.addEventListener('offline', () => 
    store.commit('app/setIsOnline', false)
  )
}