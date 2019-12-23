import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '控制台首页' },
    component: () => import('@/views/Index'),
    redirect: '/main',
    children: [
      { path: '/main', name: 'Main', meta: { title: '数据统计' }, component: () => import('@/views/Main') },
      { path: '/users', meta: { title: '会员管理' }, component: () => import('@/views/user/Users') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
