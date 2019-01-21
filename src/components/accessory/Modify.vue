<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" size="mini" label-width="150px">
      <el-form-item label="配件名称" prop="accessoryName">
        <el-input v-model="form.accessoryName"></el-input>
      </el-form-item>
      <el-form-item label="配件价格" prop="accessoryPrice">
        <el-input-number v-model="form.accessoryPrice" :precision="2"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="doModify('form')">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
export default {
  props: [ 'rows' ],
  data () {
    return {
      form: {
        accessoryName: '',
        accessoryPrice: ''
      },
      rules: {
        accessoryName: [{ required: true, message: '请输入配件名称', trigger: 'blur' }],
        accessoryPrice: [{ required: true, message: '请输入配件价格', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.form = { ...this.rows }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    doModify (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.accessoryModify(this.form).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              this.onClose()
              Success('配件修改成功')
            } else {
              Error(rs.data.retMsg)
            }
          })
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
