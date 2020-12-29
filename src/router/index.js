import Vue from 'vue'
import VueRouter from 'vue-router'
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/index',
    name: '首页',
    component: () => import('../views/Main.vue'),
    children: [
      {
        name: 'desktop',
        path: '/desktop',
        component: () => import('../views/index.vue')
      }
      // {
      //   path: '/',
      //   redirect:'/login'
      // },
      // {
      //   path:'/departmentList',
      //   name:'departmentList',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/Department/DepartmentList.vue')
      // },
      // {
      //   path:'/menuList',
      //   name:'menuList',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/menu/MenuList.vue')
      // },
      // {
      //   path:'/roleList',
      //   name:'roleList',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/Role/RoleList.vue')
      // },
      // {
      //   path:'/userList',
      //   name:'userList',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/User/UserList.vue')
      // }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
