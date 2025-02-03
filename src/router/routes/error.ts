import { type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  name: 'not-found',
  component: () => import('@/views/Error.vue'),
  meta: {
    title: 'Something went wrong! ⚠️',
    metaTags: [
      {
        name: 'description',
        content: 'Sorry, it looks like something went wrong and you\'ve ended up somewhere you shouldn\'t be.'
      },
      {
        property: 'og:description',
        content: 'Sorry, it looks like something went wrong and you\'ve ended up somewhere you shouldn\'t be.'
      }
    ]
  }
}

export default route
