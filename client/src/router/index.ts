import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'home',
        component: () => import('../views/FriendsList.vue')

      },
      {
        path: 'play',
        component: () => import('../views/Play.vue')

      },
      {
        path: 'puzzles',
        component: () => import('../views/Puzzles.vue')

      },
      {
        path: 'learn',
        component: () => import('../views/Learn.vue')

      },
      {
        path: 'connect',
        component: () => import('../views/Connect.vue')

      },
      {
        path: 'friend/:id',
        component: () => import('../views/Friend.vue'),
        props: true
      },

    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
