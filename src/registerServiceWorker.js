/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: './' },
    ready () {
      console.info('👷‍♂️', 
        'App is being served from cache by a service worker.\n — For more details, visit https://goo.gl/AFskqB',
      )
    },
    registered () {
      console.info('👷‍♂️', 'Service worker has been registered.')
    },
    cached () {
      console.info('👷‍♂️', 'Content has been cached for offline use.')
      document.dispatchEvent(new CustomEvent('swCached'))
    },
    updatefound () {
      console.info('👷‍♂️', 'New content is downloading.')
      document.dispatchEvent(new CustomEvent('swUpdating'))
    },
    updated (registration) {
      console.info('👷‍♂️', 'New content is available; please refresh.')
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      )
    },
    offline () {
      console.info('👷‍♂️', 'No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('👷‍♂️', 'Error during service worker registration:', error)
    }

  })
}