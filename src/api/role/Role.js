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
export function getRouleIdByUser (userId) {
  return request({
    url: `api/role/getRouleIdByUser/${userId}`,
    method: 'get',
  })
}
export function assignRoleMenu (UserRole) {
  return request({
    url: `api/menu/saveAssignRole`,
    method: 'post',
    data:UserRole
  })
}
export function assignRole (userRole) {
  return request({
    url: `api/role/assignRole`,
    method: 'post',
    data:userRole
  })
}
export function MenuTree (RoleMenuQuery) {
  return request({
    url: `api/menu/MenuTree`,
    method: 'post',
    data:RoleMenuQuery
  })
}
