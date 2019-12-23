import request from '@/util/request'

export function getUsers (data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
