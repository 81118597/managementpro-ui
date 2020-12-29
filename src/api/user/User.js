import request from '@/utils/request'

// 用户信息
export function Userlist (page, limit) {
  return request({
    url: `/user/list/${page}/${limit}`,
    method: 'get'
  })
}
// 用户信息
export function getuserList (SysUserQuery) {
  return request({
    url: `api/user/getuserList`,
    method: 'post',
    data:SysUserQuery
  })
}
