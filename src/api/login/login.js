import request from '@/utils/request'
import Qs from 'qs'

export function login (LoginForm) {
  return request({
    url: 'api/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: Qs.stringify(LoginForm)
  })
}
// 获取验证码
export function imageCode () {
    return request({
      url: 'api/user/code/image',
      method: 'get',
      responseType: 'blob'
    })
}
