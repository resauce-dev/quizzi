import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import setMetaOnChange from './setMetaOnChange'
import { guardBefore, guardAfter } from './guard'

import route_home from '@/router/routes/home'
import QuizList from '@/views/QuizList.vue'
import Quiz from '@/views/Quiz.vue'
import Question from '@/views/Question.vue'
import Privacy from '@/views/Privacy.vue'
import About from '@/views/About.vue'
import Settings from '@/views/Settings.vue'
import Achievements from '@/views/Achievements.vue'
import route_error from '@/router/routes/error'

/**
 * Configre a list of pages
 */
const routes: RouteRecordRaw[] = [
  route_home,
  {
    path: '/quizzes',
    name: 'Quiz List',
    component: QuizList
  },
  {
    path: '/quizzes/:quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/quizzes/:quiz/:question',
    name: 'Question',
    component: Question
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: Achievements
  },
  route_error
]

/**
 * Setup the router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /**
   * Ensures that on navgiation, we scroll to the top of the page.
   */
  scrollBehavior() {
    return new Promise((resolve) => {
      const DURATION_OF_PAGE_TRANSITION = 350
      setTimeout(
        () => resolve({ left: 0, top: 0 }),
        DURATION_OF_PAGE_TRANSITION
      )
    })
  }
})

/**
 * Configure page's meta tags
 */
router.beforeEach(guardBefore)
router.beforeEach(setMetaOnChange)
router.afterEach(guardAfter)

export default router
