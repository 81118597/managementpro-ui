<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <!--登录区域-->
    <div class="login_box">
      <!--头像-->
<!--      <div class="avatar_box"><img src="../assets/img/QQ.jpg"></div>-->
      <p class="FontClass">欢迎使用后台管理系统</p>
        <!--表单-->
        <div>
          <el-form  :model="LoginForm"  :rules="rules" ref="LoginForm" label-width="0px" class="Login_Form">
            <el-form-item prop="username">
              <el-input v-model="LoginForm.username" name="username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input  type="password" v-model="LoginForm.password" name="password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item  prop="verification">
              <div class="verification_box">
                <el-input  type="verification" v-model="LoginForm.verification" prefix-icon="el-icon-mobile" class="verification"></el-input>
                <img :src="codeimg" class="verification_img" @click="changeCodeImg()">
              </div>
            </el-form-item>
            <el-form-item class="login_btn">
              <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button>
              <el-button @click="resetForm('LoginForm')">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>

  </div>

</template>
<script>
import { login, imageCode } from '@/api/login/login'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
      LoginForm: {
        username: '',
        password: '',
        verification: ''
      },
      codeimg: '',
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, message: '长度在3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        verification: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.changeCodeImg()
    this.getCookie()
  },
  methods: {
    changeCodeImg () {
      imageCode().then(response => {
        this.codeimg = window.URL.createObjectURL(response.data) // 后端返回前端渲染
      })
    },

    getCookie () {

    },
    submitForm (formName) {
      console.log(this.LoginForm.username, this.LoginForm.password)
      // 提交到store
      this.$store.commit('getMenuList', this.$router)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.LoginForm)
            .then(response=>{
              if(response.code==200){
                sessionStorage.setItem('menuList',JSON.stringify(response.data.menuList))
                sessionStorage.setItem('routerList', JSON.stringify(response.data.routerList))
                Cookies.set("token",response.data.token)
                this.$router.push('/desktop')
              }else{
                this.$notify.error({
                  title: '错误',
                  message: response.data.data.message
                });
              }
            })
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    height: 100%;
    background:url("../../assets/img/bj.jpg") no-repeat;
    background-size: 100%;
  }
  .login_box{
    width: 450px;
    height: 380px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background:rgba(255,255,255,0.3);
    .avatar_box{
      width: 100px;
      height: 100px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0,1);
      margin: 0px auto ;
      background:rgba(255,255,255,0.3);
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .FontClass{
      text-align: center;
      font-size: 25px;
      color: #ffffff;
      font-weight: 500;
    }
    .Login_Form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0px 30px;
      box-sizing: border-box;
      .login_btn{
        margin-top: 13%;
        display: flex;
        justify-content: flex-end;
      }
      .verification_img{
        width: 30%;
        height: 40px;
        justify-content: flex-end;
        margin-left: 50px;
      }
      .verification_box{
        display: flex;
        .verification{
          width: 70%;
          justify-content: left;
        }
      }
    }
  }
</style>
