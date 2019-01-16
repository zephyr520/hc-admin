<template>
  <div style="text-align:center">
    <el-form ref="Form" :model="Form" size="mini" label-width="150px">
      <el-upload
                class="upload-demo"
                ref="upload"
                name="file"
                :action="uploadUrl"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :limit="1"
                :on-exceed="handleExceed"
                :multiple="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls或xlsx文件,且不超过10MB</div>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-loading="ifLoading" size="mini" @click="doImport">导 入</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
export default {
  data () {
    return {
      ifLoading: false,
      fileList: [],
      uploadUrl: '/hc-admin/back/recycling/list/import',
      Form: {
        file: ''
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    getToken () {
      return JSON.parse(sessionStorage.getItem('token'))
    },
    beforeUpload (file) {
      const fileSize = file.size / 1024 / 1024 < 10
      if (!fileSize) {
        Error('上传文件大小不能超过10MB')
        return false
      }
      let excelFileExt = "'.xls', '.xlsx'"
      let fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      if (excelFileExt.indexOf(fileExt) <= -1) {
        Error('上传文件格式必须是xls或xlsx')
        return false
      }
      this.Form.file = file
      return true
    },
    handleExceed (files, fileList) {
      Error('限制只能上传 1 个文件,请删除后继续上传')
    },
    doImport () {
      if (this.ifLoading) return
      if (this.Form.file === '') {
        Error('请选择上传的文件')
        return false
      }
      let params = new FormData()
      params.append('file', this.Form.file)
      this.$api.recyclingListImport(params).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          Success('回收单导入成功')
          this.ifLoading = true
          this.onClose()
        } else {
          Error(rs.data.retMsg)
        }
      }).catch(e => {
        console.log(e)
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
