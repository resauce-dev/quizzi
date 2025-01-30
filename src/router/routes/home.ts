import { type RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/Home.vue'

const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    title: 'Quizzi',
  }
}

export default route
