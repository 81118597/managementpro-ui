import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import './assets/css/global.css'
import axios from 'axios'
import Fragment from 'vue-fragment'
import Cookies from 'js-cookie'
import menu from '@/menu/index'
Vue.prototype.hasPerm=menu
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
// 进入路由之前执行
router.beforeEach((to, from, next) => {
  // to 将要进入的路由
  // from 将要离开的路由
  // next 让路由继续执行
  // 获取当前打开的选项卡
  store.commit('getTabs')
  // 设置当前激活的选项卡
  store.commit('setActiveTabs', to.name)

  const token = Cookies.get("token")
  if (to.path === '/login') {
    if (token) {
      next({ path: '/index' })
    } else {
      next()
    }
  } else {
    if (!token && to.name !== 'login') {
      next({ path: '/login' })
    } else {
      if (store.state.MenuStore.menu_data.length === 0) {
        store.commit('getMenuList', router)
        if(to.path==="/"){
          next({path:'/index'})
        }else{
          next({path:to.path})
        }
      } else {
        next()
      }
    }
  }
})
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
