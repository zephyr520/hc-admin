<template>
  <el-col :span="24" class="header">
      <el-col :span="10" class="logo logo-width">
        {{sysName}}
      </el-col>
      <el-col :span="14" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img src="../../assets/user.png" />{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>密码修改</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
</template>

<script>
export default {
  data () {
    return {
      sysName: 'VUE后台框架',
      sysUserName: '张三'
    }
  },
  methods: {
    // 退出登录
    logout: function () {
      console.log('logout')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  color:#fff;
  background: #29a176;
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color:#fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
  .logo {
    // width:230px;
    height:60px;
    font-size: 22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
    img {
      width: 40px;
      float: left;
      margin: 10px 10px 10px 18px;
    }
    .txt {
      color:#fff;
    }
  }
  .logo-width{
    width:200px;
  }
  .logo-collapse-width{
    width:60px
  }
}
</style>
