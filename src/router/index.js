import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import QuizList from '@/views/QuizList.vue'
import Quiz from '@/views/Quiz.vue'
import Question from '@/views/Question.vue'
import Privacy from '@/views/Privacy.vue'
import About from '@/views/About.vue'
import Settings from '@/views/Settings.vue'
import Achievements from '@/views/Achievements.vue'
import Error from '@/views/Error.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/quizzes',
    name: 'Quiz List',
    component: QuizList
  },
  { path: '/quizzes/:quiz',
    name: 'Quiz',
    component: Quiz
  },
  { path: '/quizzes/:quiz/:question',
    name: 'Question',
    component: Question
  },
  { path: '/about',
    name: 'About',
    component: About
  },
  { path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  { path: '/settings',
    name: 'Settings',
    component: Settings
  },
  { path: '/achievements',
    name: 'Achievements',
    component: Achievements
  },
  { path: "*", 
    name: 'Error',
    component: Error
  },
]

export default new VueRouter({routes})
