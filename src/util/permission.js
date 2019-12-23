import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { session } from './session'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = session('token')

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const username = store.getters.username
      if (username) {
        next()
      } else {
        try {
          await store.dispatch('admin/getInfo')
          next()
        } catch (error) {
          await store.dispatch('admin/resetToken')
          Message.error(error || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
