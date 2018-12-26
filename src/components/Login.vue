<template>
  <div class="sys-login">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" :loading="loading" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Error, Success } from '../common/js/uilt'
export default {
  name: 'Login',
  data () {
    return {
      loading: false, // 是否请求中
      loginForm: {
        username: '',
        password: '',
        clientType: 'ADMIN'
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.login(this.loginForm).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              sessionStorage.setItem('token', JSON.stringify(rs.data.data.accessToken))
              Success('登录成功')
              this.$router.push({ path: '/wellcome' })
            } else {
              Error(rs.data.retMsg)
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sys-login {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ECECEC;
  z-index: 10;
  .login-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    position: relative;
    top: 50%;
    left: 50%;
    background: #fff;
    width: 500px;
    height: 230px;
    margin-left: -300px;
    margin-top: -150px;
    padding: 35px 55px 35px 25px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 1px 11px rgba(0,0,0,.27);
    border-radius: 2px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 35px auto;
      text-align: center;
      color: #505458;
    }

  }
}
.sys-login::before {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #29a176;
    content: "";
    z-index: 0;
}
</style>
