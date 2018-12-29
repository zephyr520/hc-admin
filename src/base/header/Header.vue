<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo logo-width">
      {{sysName}}
    </el-col>
    <el-col :span="14" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img src="../../assets/user.png" />{{sysUserName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modifyPwd()">密码修改</el-dropdown-item>
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
      sysUserName: ''
    }
  },
  methods: {
    // 退出登录
    logout: function () {
      this.$confirm('此操作将退出登录, 是否继续?', '系统温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('accessList')
        this.$router.push({ path: '/login' })
      }).catch(() => {
      })
    },
    _initInfo () {
      let that = this
      this.$api.userInfo().then(rs => {
        if (rs.data.data.realName === '') {
          return ''
        } else {
          that.sysUserName = rs.data.data.realName
          sessionStorage.setItem('ADMIN_NAME', rs.data.data.realName)
        }
      })
    },
    modifyPwd () {
      console.log('password modify')
    }
  },
  created () {
    this._initInfo()
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
