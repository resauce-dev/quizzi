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
 * When implementing push requests
 * Check this source:
 * https://github.com/thelounge/thelounge/blob/master/src/plugins/webpush.js
 */
self.addEventListener('push', function (e) {
  if (!(self.Notification && self.Notification.permission === 'granted')) return

  var data;

  if (e.data) {
    data = JSON.parse(e.data.text())
  } else {
    data = {
      title: 'Quizzi: Coninue Playing!',
      body: 'Here is a notification body!'
    }
  }

  const title = data.title
  const options = {
    body: data.body,
    icon: './img/icons/android-chrome-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    badge: './assets/badge.png',
    icon: './assets/icon.png',
    actions: [
      { action: 'continue', 
        title: 'Carry On',
        icon: 'images/checkmark.png'
      },
      { action: 'close', 
        title: 'Not Interested',
        icon: 'images/xmark.png'
      },
    ]
  }

  e.waitUntil(
    self.registration.showNotification(title, options)
  )
})



self.addEventListener('notificationclose', function(e) {
  var notification = e.notification
  var primaryKey = notification.data.primaryKey

  console.log('Closed notification: ' + primaryKey)
})

self.addEventListener('notificationclick', event => {
  if (event.action === 'close') {
    event.notification.close()
  } else { // continue
    event.waitUntil(self.clients.matchAll().then(clients => {
      // If tab exists, focus it, else, open new tab
      if (clients.length)clients[0].focus()
      else self.clients.openWindow('/')
    }))
  }
})

// application.js | cancel all notifications
// document.querySelector('#notification-cancel').onclick = async () => {
//   const reg = await navigator.serviceWorker.getRegistration();
//   const notifications = await reg.getNotifications({
//     includeTriggered: true
//   });
//   notifications.forEach(notification => notification.close());
//   alert(`${notifications.length} notification(s) cancelled`);
// };

// Send a scheduled notification
// const reg = await navigator.serviceWorker.getRegistration();
// Notification.requestPermission().then(permission => {
//   if (permission !== 'granted') {
//     alert('you need to allow push notifications');
//   } else {
//     const timestamp = new Date().getTime() + 5 * 1000; // now plus 5000ms
//     reg.showNotification(
//       'Demo Push Notification',
//       {
//         tag: timestamp, // a unique ID
//         body: 'Hello World', // content of the push notification
//         showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
//         data: {
//           url: window.location.href, // pass the current url to the notification
//         },
//         badge: './assets/badge.png',
//         icon: './assets/icon.png',
//       }
//     );
//   }
// });




self.addEventListener('activate', (event) => {
  console.info('Event: Activate');
  event.waitUntil(
    self.clients.claim(),
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          const cacheName = 'example'
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/**
 * Cache falling back to the network (Offline-First)
 * 
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_falling_back_to_the_network
 */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});