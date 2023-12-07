import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/Login.vue'
import ProfileIndex from '@/views/profile/index.vue'
import Discover from '@/views/discover/index.vue' 
import Settings from '@/views/profile/Settings.vue'
import Sort from '@/views/bank/Sort.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        showTabbar: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileIndex,
      meta:{
        showTabbar: true
      },
      children: [
        {
          path :'',
          name:'profile',
          component: () => import('../views/profile/Profile.vue')
        },
        {
          path :'setting',
          name:'setting',
          component: Settings,
          meta:{
            showTabbar: false
          }
        }
      ]
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    },
    {
      path: '/bank/:id',
      name: 'sort',
      component: Sort
    },
    // {
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router