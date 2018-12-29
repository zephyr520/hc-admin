<template>
  <div>
    <el-form ref="form" :model="form" size="mini" label-width="150px">
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="menuId"
        ref="tree"
        default-expand-all
        :props="defaultProps"
        @check-change="handleCheckChange"
        style="width:450px;overflow-y:auto">
      </el-tree>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="doAuth">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error, hasSubMenus } from '@/common/js/uilt'
export default {
  props: ['row'],
  data () {
    return {
      defaultProps: {
        children: 'subMenus',
        label: 'menuName'
      },
      menuList: [],
      menuIdList: [],
      form: {
        roleId: '',
        menuIds: []
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
      this.$refs.tree.setCheckedKeys([])
    },
    handleCheckChange (data, checked, indeterminate) {
      this.form.menuIds = Array.from(new Set([...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]))
    },
    // 获取所有菜单信息
    getMenuList () {
      this.$api.listAllMenu().then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.menuList = rs.data.data || []
          this.getMenuIdList()
        }
      })
    },
    // 获取已授权的菜单列表
    getMenuIdList () {
      this.$api.authMenuIdList(this.form.roleId).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.menuIdList = rs.data.data || []
          this.calArr(this.menuList)
          this.$refs.tree.setCheckedKeys(this.form.menuIds)
        }
      })
    },
    // 处理菜单选中数据
    calArr (arr) {
      arr.forEach(item => {
        if (this.menuIdList.indexOf(item.menuId) > -1 && !hasSubMenus(item)) {
          this.form.menuIds.push(item.menuId)
        }
        if (hasSubMenus(item)) {
          this.calArr(item.subMenus)
        }
      })
    },
    doAuth () {
      this.$api.roleAuthMenu(this.form).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.onClose()
          Success('授权成功')
        } else {
          Error(rs.data.retMsg)
        }
      })
    }
  },
  created () {
    this.form.roleId = this.row.roleId
    this.getMenuList()
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
