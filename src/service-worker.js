/**
 * Cache Default Files
 */
self.addEventListener('install', event => {
  event.waitUntil(
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
self.addEventListener('activate', (event) => {
  console.info('Event: Activate')
  event.waitUntil(
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
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request)
    })
  )
})