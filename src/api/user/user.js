import request from '@/utils/request'

// 用户信息
export function Userlist (page, limit) {
  return request({
    url: `/user/list/${page}/${limit}`,
    method: 'get'
  })
}
