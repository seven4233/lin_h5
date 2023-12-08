import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/index.vue'
import Login from '@/views/login/Login.vue'
import ProfileIndex from '@/views/profile/index.vue'
import Discover from '@/views/discover/index.vue' 
import Settings from '@/views/profile/Settings.vue'
import Sort from '@/views/bank/Sort.vue'
import Single from '@/views/bank/components/Single.vue'
import SingleSubmit from '@/views/bank/components/SingleSubmit.vue'
import Multiple from '@/views/bank/components/Multiple.vue'
import MultipleSubmit from '@/views/bank/components/MultipleSubmit.vue'
import Judge from '@/views/bank/components/Judge.vue'
import JudgeSubmit from '@/views/bank/components/JudgeSubmit.vue'
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
          component: () => import('@/views/profile/Profile.vue')
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
      component: Sort,
      meta:{
        showTabbar: false
      }
    },
    
    {
      path:'/bank/:id/single',
      name:'single',
      component: Single,
      meta:{
        showTabbar: false
      }
    },
    {
      path:'/bank/:id/single_submit',
      name:'single_submit',
      component: SingleSubmit,
      meta:{
        showTabbar: false
      }
    },

    // 多选
    {
      path:'/bank/:id/multiple',
      name:'multiple',
      component: Multiple,
      meta:{
        showTabbar: false
      }
    },
    {
      path:'/bank/:id/multiple_submit',
      name:'multiple_submit',
      component: MultipleSubmit,
      meta:{
        showTabbar: false
      }
    },
        // 判断
        {
          path:'/bank/:id/judge',
          name:'judge',
          component: Judge,
          meta:{
            showTabbar: false
          }
        },
        {
          path:'/bank/:id/judge_submit',
          name:'multipljudge_submit',
          component: JudgeSubmit,
          meta:{
            showTabbar: false
          }
        }
    // {
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
