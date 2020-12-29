import request from '@/utils/request'

export function getDeptList (DeptQuery) {
  return request({
    url: 'api/dept/deptList',
    method: 'post',
    data:DeptQuery
  })
}
export function adddept (SysDept) {
  return request({
    url: 'api/dept/adddept',
    method: 'post',
    data:SysDept
  })
}
export function getInfo (deptId) {
  return request({
    url: `api/dept/${deptId}`,
    method: 'get',
  })
}
export function updadept (SysDept) {
  return request({
    url: `api/dept/updadept`,
    method: 'put',
    data:SysDept
  })
}
export function deldept (deptId) {
  return request({
    url: `api/dept/del/${deptId}`,
    method: 'delete',
  })
}
export function dept () {
  return request({
    url: `api/dept/dept`,
    method: 'get',
  })
}
export function getLeftTree () {
  return request({
    url: `api/dept/getLeftTree`,
    method: 'get',
  })
}
