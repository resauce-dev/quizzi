/**
 * Cache Default Files
 */
 self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('assets').then(cache => {
      return cache.addAll([
        '/audio/achievement_complete.wav',
        '/audio/game_complete.wav',
        '/audio/key_press.wav',
        '/audio/question_complete.wav',
      ])
    })
  )
})

/**
 * Clear All Caches
 */
self.addEventListener('activate', e => {
  console.info('Event: Activate')
  e.waitUntil(
    self.clients.claim(),
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          const cacheName = 'example'
          if (cache !== cacheName) {
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

/**
 * Cache falling back to the network (Offline-First)
 * 
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_falling_back_to_the_network
 */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request)
    })
  )
})

/**
 * Listen for messages that trigger skipWaiting
 * Important for Service-Worker update button
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})