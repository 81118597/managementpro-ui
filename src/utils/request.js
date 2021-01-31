import axios from 'axios'
import Cookies from 'js-cookie'
import { Notification, MessageBox, Message } from 'element-ui'
const instance = axios.create({
  baseURL: 'http://47.113.102.7:88',
  timeout: 10000
})
instance.interceptors.request.use(
  config => {
    //debugger
    if (Cookies.get('token')) {
      config.headers['Authorization'] = Cookies.get('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  })
instance.interceptors.response.use(
  response => {
    const res = response.data
    const re = response.data.data
    // debugger
    if (res.code === 200) {
      return response.data;
    } else{
      return response;
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
// else if(re){
//   MessageBox.confirm(
//     '登录状态已过期，您可以继续留在该页面，或者重新登录',
//     '系统提示',
//     {
//       confirmButtonText: '重新登录',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }
//   ).then(() => {
//     Cookies.remove('token')
//     window.location.href='/login'
//     return response.data;
//   })
export default instance
