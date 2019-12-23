import request from '@/util/request'

export function getIndexInfo () {
  return request({
    url: '/index',
    method: 'get'
  })
}
