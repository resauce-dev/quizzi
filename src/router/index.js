import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/quizzes',
    name: 'Quiz List',
    component: () => import('@/views/QuizList.vue')
  },
  { path: '/quizzes/:quiz',
    name: 'Quiz',
    component: () => import('@/views/Quiz.vue')
  },
  { path: '/quizzes/:quiz/:question',
    name: 'Question',
    component: () => import('@/views/Question.vue')
  },
  { path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  { path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue')
  },
  { path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  { path: '/achievements',
    name: 'Achievements',
    component: () => import('@/views/Achievements.vue')
  },
  { path: "*", 
    name: 'Error',
    component: () => import('@/views/Error.vue')
  },
]

export default new VueRouter({routes})
