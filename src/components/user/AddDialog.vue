<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" size="mini" label-width="150px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="passWord">
        <el-input type="password" v-model="form.passWord"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="realName">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="用户手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="'enable'">正常</el-radio>
          <el-radio :label="'disable'">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统角色" prop="roleId">
        <el-radio-group v-model="form.roleId">
          <el-radio :label="item.roleId" :key="item.roleId" v-for="item in roleList">{{item.roleName}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" v-if="editType === 1" @click="doSave('form')">保 存</el-button>
      <el-button type="primary" size="mini" v-if="editType === 2" @click="doModify('form')">修 改</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
export default {
  props: [ 'editType', 'row' ],
  data () {
    return {
      roleList: [],
      form: {
        userId: '',
        userName: '',
        passWord: '',
        realName: '',
        phone: '',
        gender: '',
        roleId: '',
        status: 'enable'
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择用户性别', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getRoleList()
    if (this.editType === 2) {
      this.form = { ...this.row }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    doSave (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.createUser(this.form).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              this.onClose()
              Success('用户创建成功')
            } else {
              Error(rs.data.retMsg)
            }
          })
        }
      })
    },
    doModify (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.modifyUser(this.form).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              this.onClose()
              Success('用户创建成功')
            } else {
              Error(rs.data.retMsg)
            }
          })
        }
      })
    },
    getRoleList () {
      this.$api.allRoleList().then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.roleList = rs.data.data
        } else {
          Error(rs.data.retMsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-footer {
  text-align: right;
}
</style>
