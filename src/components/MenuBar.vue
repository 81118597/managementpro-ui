<template>
  <el-menu
    :default-active="$route.path"
    class="menu-bar"
    :collapse="isCollapse"
    unique-opened
    background-color="#304156"
    text-color="#fff"
  >
    <menu-item :menuList='menuList'></menu-item>
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      // 获取vuex中的菜单数据
      menuList: state => state.MenuStore.menu_data,
      isCollapse: state => state.MenuStore.isCollapse
      // //获取vuex中的isCollapse属性
      // isCollapse: state => state.MenuStore.isCollapse

    })
  },
  components: {
    MenuItem
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
.el-aside {
  border-right: 1px solid #e6e6e6;
}
</style>
