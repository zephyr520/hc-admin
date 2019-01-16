<template>
  <div>
    <el-form ref="Form" :model="Form" :rules="rules" size="mini" label-width="150px">
      <el-upload
              class="upload-demo"
              :action="uploadUrl+'?auth_token='+getToken()"
              :before-upload="beforeUpload"
              :file-list="fileList"
              :on-success="uploadSuccess"
              list-type="picture-card">
          <i class="el-icon-upload"></i>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="doSave">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
export default {
  props: [ 'rows' ],
  data () {
    return {
      Form: {
      },
      accessoryId: '',
      fileList: [],
      uploadUrl: '/hc-admin/accessory/image/upload',
      rules: {}
    }
  },
  created () {
    this.accessoryId = this.rows.id
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    getToken () {
      return JSON.parse(sessionStorage.getItem('token'))
    },
    beforeUpload (file) {
      const imageSize = file.size / 1024 / 1024 < 5
      if (!imageSize) {
        Error('上传图片大小不能超过5MB')
        return false
      }
      const fileType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      if (!fileType) {
        Error('上传图片格式不对')
        return false
      }
      return imageSize
    },
    uploadSuccess (response, file, fileList) {
      this.fileList.push(response.data)
    },
    doSave () {
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          let params = {
            accessoryId: this.accessoryId,
            fileUrlList: this.fileList
          }
          this.$api.accessoryImageSave(params).then(rs => {
            if (rs.data.retCode === this.$api.STATUS_OK) {
              this.onClose()
              Success('配件图片上传成功')
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
