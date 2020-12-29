import request from '@/utils/request'

export function getMenuList () {
  return request({
    url: 'api/menu/getMenuList',
    method: 'get',
  })
}
export function MenuList () {
  return request({
    url: 'api/menu/Menu',
    method: 'get',
  })
}
export function addMenu (sysMenu) {
  return request({
    url: 'api/menu/addMenu',
    method: 'post',
    data:sysMenu
  })
}
export function selectByid (menuId) {
  return request({
    url: `api/menu/${menuId}`,
    method: 'get',
  })
}
export function updaMenu (sysMenu) {
  return request({
    url: `api/menu/updaMenu`,
    method: 'put',
    data:sysMenu
  })
}
export function delMenu (menuId) {
  return request({
    url: `api/menu/del/${menuId}`,
    method: 'delete',
  })
}
