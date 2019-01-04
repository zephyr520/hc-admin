<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" size="mini" label-width="150px">
      <el-form-item label="回收员" prop="recyclingUserId">
        <el-select v-model="form.recyclingUserId" placeholder="请选回收员">
          <el-option :label="item.realName" :value="item.userId" v-for="(item, index) in recyclingUserList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截止日期" prop="expireDate">
        <el-date-picker v-model="form.expireDate" type="date" placeholder="选择截止日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="doDispatch('form')">派 单</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
export default {
  props: [ 'rows' ],
  data () {
    return {
      recyclingUserList: [],
      form: {
        recyclingUserId: '',
        expireDate: '',
        recyclingNoList: []
      },
      rules: {
        recyclingUserId: [{ required: true, message: '请选择回收员', trigger: 'change' }],
        expireDate: [{ required: true, message: '请选择截止日期', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getRecyclingUserList()
    this.form.recyclingNoList = this.rows.map((item) => item.recyclingNo)
  },
  methods: {
    getRecyclingUserList () {
      this.$api.queryRecyclingUserList().then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.recyclingUserList = rs.data.data || []
        }
      })
    },
    onClose () {
      this.$emit('close')
    },
    doDispatch (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.dispatchRecyclingList(this.form).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              this.onClose()
              Success('派单成功')
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

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
