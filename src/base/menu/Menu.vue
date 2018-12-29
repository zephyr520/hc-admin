<template>
  <aside class="menu-expanded" >
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              background-color="#F2F6FC" :router="true" :unique-opened="true">
      <template v-for="(item, index) in menuList">
          <template v-if='item.subMenus.length>0'>
            <el-submenu :index="item.menuUrl" :key="index">
              <template slot="title"><i class="el-icon-message"></i>{{item.menuName}}</template>
              <template v-for='(subItem ,index) in item.subMenus'>
                <template v-if='subItem.subMenus.length>0'>
                  <el-submenu :index="subItem.menuUrl" :key="index">
                    <template slot="title"><i class="el-icon-menu"></i>{{subItem.menuName}}</template>
                    <template v-for='(lastSubItem, index) in subItem.subMenus'>
                      <el-menu-item :index="lastSubItem.menuUrl" :key="index"><i class="el-icon-setting"></i>{{lastSubItem.menuName}}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index='subItem.menuUrl' :key="index"><i class="el-icon-menu"></i>{{subItem.menuName}}</el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index='item.menuUrl' :key="index"><i class="el-icon-menu"></i>{{item.menuName}}</el-menu-item>
          </template>
      </template>
    </el-menu>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleOpen () {
      console.log('handleopen')
    },
    handleClose () {
      console.log('handleclose')
    },
    handleselect: function (a, b) {
    },
    getMenuList () {
      this.$api.listAuthMenu().then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.menuList = rs.data.data || []
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
aside {
  flex:0 0 200px;
  width: 200px;
  .el-menu{
    height: 100%;
  }
  .collapsed{
    width:60px;
    .item{
      position: relative;
    }
    .submenu{
      position:absolute;
      top:0px;
      left:60px;
      z-index:99999;
      height:auto;
      display:none;
    }
  }
}
.menu-collapsed{
  flex:0 0 60px;
  width: 60px;
}
.menu-expanded{
  flex:0 0 200px;
  width: 200px;
}
</style>
