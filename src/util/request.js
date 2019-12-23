import axios from 'axios'
import store from '@/store'
import config from '@/util/config'
import { session } from '@/util/session'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = session('token')
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      // 10008 无效的token | 10009 token已过期
      if (res.code === 10008 || res.code === 10009) {
        MessageBox.alert('授权已过期', '提示信息', {
          confirmButtonText: '重新登录',
          showClose: false
        }).then(() => {
          store.dispatch('admin/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
