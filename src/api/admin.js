import request from '@/util/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getInfo (token) {
  return request({
    url: '/info',
    method: 'get'
  })
}
