import request from '@/utils/request'

export function getuserList (SysUserQuery) {
  return request({
    url: `api/user/getuserList`,
    method: 'post',
    data:SysUserQuery
  })
}
export function adduser (SysUser) {
  return request({
    url: `api/user/adduser`,
    method: 'post',
    data:SysUser
  })
}
export function info (userId) {
  return request({
    url: `api/user/${userId}`,
    method: 'get',
  })
}
export function updauser (SysUser) {
  return request({
    url: `api/user/updauser`,
    method: 'put',
    data:SysUser
  })
}
export function deluser (userId) {
  return request({
    url: `api/user/deluser/${userId}`,
    method: 'delete',
  })
}
export function logout () {
  return request({
    url: `api/user/loginOut`,
    method: 'post',
  })
}
