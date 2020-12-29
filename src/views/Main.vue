<template>
    <el-container class="main_container">
      <!--头部布局-->
      <el-header>
        <!--logo和项目名称-->
        <div class="left_box">
          <img src="../assets/img/logo.png">
          <span>后台管理系统</span>
        </div>
        <!--用户头像-->
        <div class="right_box">
          <el-dropdown>
              <img src="../assets/img/20201218102109.jpg">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
      </el-header>
      <el-container>
      <!--菜单栏-->
        <el-aside width="auto">
          <MenuBar></MenuBar>
        </el-aside>
      <!--右边内容显示区-->
        <el-container>
          <el-main style="padding: 0;">
            <!--菜单收缩按钮-->
            <i class="arrowIcon" @click="iconClick"
            :class="[isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"></i>
            <tabs></tabs>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
</template>
<script>
import MenuBar from '@/components/MenuBar.vue'
import Tabs from '@/components/tabs.vue'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCollapse: state => state.MenuStore.isCollapse
    })
  },
  data () {
    return {
      // isCollapse: false,
      activePath: ''
    }
  },
  components: {
    MenuBar,
    Tabs
  },
  methods: {
    iconClick () {
      this.$store.commit('setOpenOrClose')
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-tabs__header{
    position: static !important;
  }
  .arrowIcon{
    font-size: 24px;
    border: 1px solid transparent;
    float: left;
    height: 39px;
    width: 50px;
    background-color: #eaedf1;
    text-align: center;
    line-height: 39px !important;
  }
  .main_container{
    height: 100%;
  }
  .el-header{
    background-color: #D3DCE6;
    display: flex;
    justify-content:space-between;
    padding-left: 0;
    color: #ffffff;
    align-items: center;
    font-size: 20px;
    .left_box{
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        margin: 5px 0px 10px 10px;
      }
      span{
        margin-left: 15px;
      }
    }
    .right_box{
      .el-dropdown>img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0px 15px 0px 0px;
      }
    }
  }
  .el-aside {
    background-color: #304156;
    .el-menu{
      border-right: none;
    }
    .toggle_box{
      background-color: #ffffff;
      font-size:15px;
      font-weight: bold;
      line-height: 24px;
      color: #000000;
      letter-spacing: 0.2em;
      text-align: center;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #ffffff;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
