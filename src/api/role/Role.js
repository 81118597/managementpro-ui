import request from '@/utils/request'

export function getRoleList (RoleQuery) {
  return request({
    url: 'api/role/roleList',
    method: 'post',
    data:RoleQuery
  })
}
export function addrole (role) {
  return request({
    url: 'api/role/addrole',
    method: 'post',
    data:role
  })
}
export function selectById (roleId) {
  return request({
    url: `api/role/${roleId}`,
    method: 'get',
  })
}
export function updarole (SysRole) {
  return request({
    url: `api/role/updarole`,
    method: 'put',
    data:SysRole
  })
}
export function delrole (roleId) {
  return request({
    url: `api/role/del/${roleId}`,
    method: 'delete',
  })
}
