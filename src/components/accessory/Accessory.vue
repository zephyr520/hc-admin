<template>
  <div>
    <div class="breadcrumb-bar">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item :to="{ path: '/wellcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>配件管理</el-breadcrumb-item>
          <el-breadcrumb-item>配件列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </div>
    <div class="search-box">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" size="mini">
        <el-col :span="24">
          <el-form-item label="配件回收状态:">
            <el-button :type="formData.accessoryStatus === -1 ? 'primary' : 'default'" @click="changeStatus(-1)">全部</el-button>
            <el-button :type="formData.accessoryStatus === 0 ? 'primary' : 'default'" @click="changeStatus(0)">未回收</el-button>
            <el-button :type="formData.accessoryStatus === 1 ? 'primary' : 'default'" @click="changeStatus(1)">已回收未入库</el-button>
            <el-button :type="formData.accessoryStatus === 3 ? 'primary' : 'default'" @click="changeStatus(3)">已入库</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否是重要配件:">
            <el-button :type="formData.ifImportant === -1 ? 'primary' : 'default'" @click="changeIfImportant(-1)">全部</el-button>
            <el-button :type="formData.ifImportant === 0 ? 'primary' : 'default'" @click="changeIfImportant(0)">否</el-button>
            <el-button :type="formData.ifImportant === 1 ? 'primary' : 'default'" @click="changeIfImportant(1)">是</el-button>
          </el-form-item>
          <el-form-item label="是否回收失败:" style="padding-left:25px;">
            <el-button :type="formData.ifRecyclingFailed === -1 ? 'primary' : 'default'" @click="changeIfRecyclingFailed(-1)">全部</el-button>
            <el-button :type="formData.ifRecyclingFailed === 0 ? 'primary' : 'default'" @click="changeIfRecyclingFailed(0)">否</el-button>
            <el-button :type="formData.ifRecyclingFailed === 1 ? 'primary' : 'default'" @click="changeIfRecyclingFailed(1)">是</el-button>
          </el-form-item>
          <el-form-item label="是否拍照:" style="padding-left:25px;">
            <el-button :type="formData.ifTakePhoto === -1 ? 'primary' : 'default'" @click="changeIfTakePhoto(-1)">全部</el-button>
            <el-button :type="formData.ifTakePhoto === 0 ? 'primary' : 'default'" @click="changeIfTakePhoto(0)">否</el-button>
            <el-button :type="formData.ifTakePhoto === 1 ? 'primary' : 'default'" @click="changeIfTakePhoto(1)">是</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="回收单号:">
            <el-input v-model="formData.recyclingNo" placeholder="请输入回收单号"></el-input>
          </el-form-item>
          <el-form-item label="回收员:">
            <el-input v-model="formData.accessoryRecyclingUserName" placeholder="请输入回收员姓名"></el-input>
          </el-form-item>
          <el-form-item label="配件回收时间:">
            <el-date-picker :editable="false" v-model="formData.startAccessoryRecyclingTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="回收开始时间"></el-date-picker>
            <el-date-picker :editable="false" v-model="formData.endAccessoryRecyclingTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="回收结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="配件名称:">
            <el-input v-model="formData.accessoryName" placeholder="请输入配件名称"></el-input>
          </el-form-item>
          <el-form-item label="入库员:">
            <el-input v-model="formData.accessoryStorageUserName" placeholder="请输入入库员"></el-input>
          </el-form-item>
          <el-form-item label="配件入库时间:">
            <el-date-picker :editable="false" v-model="formData.startAccessoryStorageTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="入库开始时间"></el-date-picker>
            <el-date-picker :editable="false" v-model="formData.endAccessoryStorageTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="入库结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" v-access="'back:accessory:list:query'" @click="getListData(1)">查询</el-button>
          <el-tooltip class="item" content="标记回收" placement="top-start">
            <el-button type="success" icon="el-icon-edit" size="mini" v-access="'back:accessory:has:recycled'" @click="recycled">回收</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="撤销回收" placement="top-start">
            <el-button type="warning" icon="el-icon-circle-close-outline" size="mini" v-access="'back:accessory:cancel:recycled'" @click="cancelRecycled">取消</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="标记入库" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" v-access="'back:accessory:has:storage'" @click="storage">入库</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="撤销入库" placement="top-start">
            <el-button type="info" icon="el-icon-circle-close-outline" size="mini" v-access="'back:accessory:cancel:storage'" @click="cancelStorage">撤销</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="修改配件" placement="top-start">
            <el-button type="success" icon="el-icon-edit-outline" size="mini" v-access="'back:recycling:accessory:modify'" @click="accessoryModify">修改</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="删除配件" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" v-access="'back:recycling:accessory:delete'" @click="accessoryDelete">删除</el-button>
          </el-tooltip>
          <el-button type="primary" size="mini" v-access="'back:accessory:image:upload'" @click="uploadImage"><i class="el-icon-upload el-icon--right"></i>上传</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box" v-loading="ifLoading">
      <el-table ref="multipleTable" :data="tableData" highlight-current-row fit v-loading="ifLoading" size="mini" border style="width: 100%;" @selection-change="onTableSelect">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="recyclingNo" label="回收单号" align="center" min-width="120"></el-table-column>
        <el-table-column prop="accessoryName" label="配件名称" align="center" min-width="140"></el-table-column>
        <el-table-column prop="accessoryPrice" label="价格" align="center"></el-table-column>
        <el-table-column prop="accessoryNum" label="数量" align="center"></el-table-column>
        <el-table-column label="配件状态" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.accessoryStatus === 0">{{scope.row.accessoryStatusStr}}</el-tag>
            <el-tag type="warning" v-if="scope.row.accessoryStatus === 1">{{scope.row.accessoryStatusStr}}</el-tag>
            <el-tag type="success" v-if="scope.row.accessoryStatus === 3">{{scope.row.accessoryStatusStr}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="回收员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>回收时间：{{ scope.row.accessoryRecyclingTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" v-if="scope.row.accessoryRecyclingUserName != null">{{ scope.row.accessoryRecyclingUserName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入库员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>入库时间：{{ scope.row.accessoryStorageTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" v-if="scope.row.accessoryStorageUserName != null">{{ scope.row.accessoryStorageUserName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="配件图片" align="center">
          <template slot-scope="scope">
            <viewer :images="scope.row.accessoryImageList">
              <img v-for="src in scope.row.accessoryImageList" :src="src" :key="src" width="30" height="30"/>
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="回收失败" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ifRecyclingFailed" active-text="是" :active-value="true" inactive-text="否" :inactive-value="false" @change="accessoryRecyclingFailure($event, scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="回收拍照" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ifTakePhoto" active-text="是" :active-value="true" inactive-text="否" :inactive-value="false" @change="accessoryTakePhoto($event, scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="重要配件" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.ifImportant === true">是</el-tag>
            <el-tag type="primary" v-if="scope.row.ifImportant === false">否</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <div class="table-list-pager" v-if="tableData.length > 0">
        <el-pagination :total="total" @current-change="onPageChange" :page-size='formData.pageSize' :current-page="formData.pageNo" :layout="'total, prev, pager, next, jumper'" ></el-pagination>
      </div>
    </div>

    <el-dialog title="配件图片上传" width="30%" :visible.sync="showUploadModal" :before-close="closeUploadDialog">
      <upload-dialog v-on:close="closeUploadDialog" :rows="currentEditRow" v-if="showUploadModal"></upload-dialog>
    </el-dialog>
    <el-dialog title="配件修改" width="40%" :visible.sync="showModifyModal" :before-close="closeModifyDialog">
      <Modify v-on:close="closeModifyDialog" :rows="currentEditRow" v-if="showModifyModal"></Modify>
    </el-dialog>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
import mixin from '@/components/common/mixin'
import UploadDialog from './UploadDialog'
import Modify from './Modify'
export default {
  name: 'Accessory',
  mixins: [mixin],
  components: { UploadDialog, Modify },
  data () {
    return {
      formData: {
        pageNo: 1,
        pageSize: 10,
        accessoryStatus: -1,
        ifImportant: -1,
        ifRecyclingFailed: -1,
        ifTakePhoto: -1,
        recyclingNo: '',
        accessoryRecyclingUserName: '',
        accessoryName: '',
        accessoryStorageUserName: '',
        startAccessoryRecyclingTime: '',
        endAccessoryRecyclingTime: '',
        startAccessoryStorageTime: '',
        endAccessoryStorageTime: ''
      },
      showUploadModal: false,
      showModifyModal: false,
      ifLoading: false,
      tableData: [],
      total: 0
    }
  },
  created () {
    this.getListData(1)
    if (this.$route.params.recyclingNo != null) {
      this.formData.recyclingNo = this.$route.params.recyclingNo
    }
  },
  methods: {
    getListData (page) {
      if (this.ifLoading) return
      this.ifLoading = true
      this.formData.pageNo = page
      this.$api.queryRecyclingAccessoryList(this.formData).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.tableData = rs.data.data.list || []
          this.total = rs.data.data.total || 1
        } else {
          Error(rs.data.retMsg)
        }
        this.ifLoading = false
      }).catch(r => {
        this.ifLoading = false
      })
    },
    onPageChange (page) {
      this.getListData(page)
    },
    changeStatus (label) {
      this.formData.accessoryStatus = label
      this.getListData(1)
    },
    changeIfImportant (label) {
      this.formData.ifImportant = label
      this.getListData(1)
    },
    changeIfRecyclingFailed (label) {
      this.formData.ifRecyclingFailed = label
      this.getListData(1)
    },
    changeIfTakePhoto (label) {
      this.formData.ifTakePhoto = label
      this.getListData(1)
    },
    // 标记配件或者撤销配件回收失败操作
    accessoryRecyclingFailure (value, row) {
      this.$api.accessoryRecyclingFailure({id: row.id, ifRecyclingFailed: value}).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          Success('操作成功')
        } else {
          Error(rs.data.retMsg)
        }
        this.getListData(this.formData.pageNo)
      })
    },
    // 配件回收是否需要拍照处理
    accessoryTakePhoto (value, row) {
      this.$api.accessoryTakePhoto({id: row.id, ifTakePhoto: value}).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          Success('操作成功')
        } else {
          Error(rs.data.retMsg)
        }
        this.getListData(this.formData.pageNo)
      })
    },
    // 标记配件为已回收
    recycled () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$api.accessoryHasRecycled(this.currentEditRow.id).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.getListData(this.formData.pageNo)
          Success('配件回收成功')
        } else {
          Error(rs.data.retMsg)
        }
      })
    },
    // 撤销回收
    cancelRecycled () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$api.accessoryCancelRecycled(this.currentEditRow.id).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.getListData(this.formData.pageNo)
          Success('配件撤销回收成功')
        } else {
          Error(rs.data.retMsg)
        }
      })
    },
    // 配件入库
    storage () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$api.accessoryHasStorage(this.currentEditRow.id).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.getListData(this.formData.pageNo)
          Success('配件入库成功')
        } else {
          Error(rs.data.retMsg)
        }
      })
    },
    // 撤销入库
    cancelStorage () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$api.accessoryCancelStorage(this.currentEditRow.id).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.getListData(this.formData.pageNo)
          Success('配件入库撤销成功')
        } else {
          Error(rs.data.retMsg)
        }
      })
    },
    closeUploadDialog () {
      this.showUploadModal = false
      this.getListData(this.formData.pageNo)
    },
    uploadImage () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.showUploadModal = true
    },
    accessoryDelete () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.accessoryDelete(this.currentEditRow.id).then(rs => {
          if (rs.data.retCode === this.$api.STATUS_OK) {
            this.getListData(this.formData.pageNo)
            Success('删除成功')
          } else {
            Error(rs.data.retMsg)
          }
        })
      }).catch(() => {
      })
    },
    closeModifyDialog () {
      this.showModifyModal = false
      this.getListData(this.formData.pageNo)
    },
    accessoryModify () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.showModifyModal = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
