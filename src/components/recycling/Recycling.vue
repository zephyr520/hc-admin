<template>
  <div>
    <div class="breadcrumb-bar">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item :to="{ path: '/wellcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>回收单管理</el-breadcrumb-item>
          <el-breadcrumb-item>回收单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </div>
    <div class="search-box">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" size="mini">
        <el-col :span="24">
          <el-form-item label="回收单中有无配件:">
            <el-button :type="formData.hasAccessory === -1 ? 'primary' : 'default'" @click="changeHasAccessory(-1)">全部</el-button>
            <el-button :type="formData.hasAccessory === 1 ? 'primary' : 'default'" @click="changeHasAccessory(1)">有配件</el-button>
            <el-button :type="formData.hasAccessory === 0 ? 'primary' : 'default'" @click="changeHasAccessory(0)">无配件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="派单状态:">
            <el-button :type="formData.dispatchStatus === -1 ? 'primary' : 'default'" @click="changeStatus(-1)">全部</el-button>
            <el-button :type="formData.dispatchStatus === 0 ? 'primary' : 'default'" @click="changeStatus(0)">未派单</el-button>
            <el-button :type="formData.dispatchStatus === 1 ? 'primary' : 'default'" @click="changeStatus(1)">已派单未过期</el-button>
            <el-button :type="formData.dispatchStatus === 2 ? 'primary' : 'default'" @click="changeStatus(2)">已派单已过期</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="回收状态:">
            <el-checkbox v-model="formData.recyclingStatusList" :label="0" @change="getListData(1)">未回收</el-checkbox>
            <el-checkbox v-model="formData.recyclingStatusList" :label="1" @change="getListData(1)">部分回收</el-checkbox>
            <el-checkbox v-model="formData.recyclingStatusList" :label="2" @change="getListData(1)">全部回收</el-checkbox>
          </el-form-item>
          <el-form-item label="入库状态:" style="padding-left:50px;">
            <el-checkbox v-model="formData.storageStatusList" :label="0" @change="getListData(1)">未入库</el-checkbox>
            <el-checkbox v-model="formData.storageStatusList" :label="1" @change="getListData(1)">部分入库</el-checkbox>
            <el-checkbox v-model="formData.storageStatusList" :label="2" @change="getListData(1)">全部入库</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="回收单号:">
            <el-input v-model="formData.recyclingNo" placeholder="请输入回收单号"></el-input>
          </el-form-item>
          <el-form-item label="档案号:">
            <el-input v-model="formData.fileNo" placeholder="请输入档案号"></el-input>
          </el-form-item>
          <el-form-item label="车牌号:">
            <el-input v-model="formData.plateNo" placeholder="请输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker :editable="false" v-model="formData.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间"></el-date-picker>
            <el-date-picker :editable="false" v-model="formData.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="修理厂名称:">
            <el-input v-model="formData.repairShopName" placeholder="请输入修理厂名称"></el-input>
          </el-form-item>
          <el-form-item label="定损员:">
            <el-input v-model="formData.staffName" placeholder="请输入定损员姓名"></el-input>
          </el-form-item>
          <el-form-item label="三级机构:">
            <el-input v-model="formData.organization" placeholder="请输入三级机构"></el-input>
          </el-form-item>
          <el-form-item label="回收员:">
            <el-input v-model="formData.recyclingUserName" placeholder="请输入回收员姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" v-access="'back:recycling:list:query'" @click="getListData(1)">查询</el-button>
          <el-button type="danger" size="mini" v-access="'back:recycling:list:dispatch'" @click="dispatchRecyclingList">派单</el-button>
          <el-tooltip class="item" content="查看派单记录" placement="top-start">
            <el-button type="info" icon="el-icon-view" size="mini" v-access="'back:recycling:dispatch:record'" @click="viewDispatchRecord"></el-button>
          </el-tooltip>
          <el-tooltip class="item" content="回收单导入" placement="top-start">
            <el-button type="warning" size="mini" v-access="'back:recycling:list:import'" @click="recyclingListImport">导入</el-button>
          </el-tooltip>
          <el-button type="danger" size="mini" v-access="'back:recycling:list:delete'" @click="deleteRecyclingList">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box" v-loading="ifLoading">
      <el-table ref="multipleTable" :data="tableData" highlight-current-row fit v-loading="ifLoading" size="mini" border style="width: 100%;" @selection-change="onTableSelect">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="回收单号" align="center" min-width="120">
          <template slot-scope="scope">
            <router-link :to="{ name: 'accessory-list', params: { recyclingNo: scope.row.recyclingNo }}">{{ scope.row.recyclingNo }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="fileNo" label="档案号" align="center" min-width="140"></el-table-column>
        <el-table-column prop="plateNo" label="车牌号" align="center" min-width="80"></el-table-column>
        <el-table-column label="车款" align="center" min-width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>定损员手机：{{ scope.row.staffPhone }}</p>
              <p>定损员姓名：{{ scope.row.staffName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.carModel }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="修理厂名称" align="center" min-width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">修理厂地址：{{scope.row.repairShopAddr}}</div>
              <el-tag>{{scope.row.repairShopName}}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="organization" align="center" label="机构"></el-table-column>
        <el-table-column prop="expireDate" align="center" label="截止日期"></el-table-column>
        <el-table-column align="center" label="回收员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>派单员：{{ scope.row.dispatchUserName }}</p>
              <p>派单时间：{{ scope.row.dispatchTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" v-if="scope.row.recyclingUserName != null">{{ scope.row.recyclingUserName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="回收单状态" align="center">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.recyclingStatus === 0">{{scope.row.recyclingStatusStr}}</el-tag>
            <el-tag type="warning" v-if="scope.row.recyclingStatus === 1">{{scope.row.recyclingStatusStr}}</el-tag>
            <el-tag type="success" v-if="scope.row.recyclingStatus === 2">{{scope.row.recyclingStatusStr}}</el-tag>
            <el-tag type="primary" v-if="scope.row.storageStatus === 0">{{scope.row.storageStatusStr}}</el-tag>
            <el-tag type="warning" v-if="scope.row.storageStatus === 1">{{scope.row.storageStatusStr}}</el-tag>
            <el-tag type="success" v-if="scope.row.storageStatus === 2">{{scope.row.storageStatusStr}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <div class="table-list-pager" v-if="tableData.length > 0">
        <el-pagination :total="total" @current-change="onPageChange" :page-size='formData.pageSize' :current-page="formData.pageNo" :layout="'total, prev, pager, next, jumper'" ></el-pagination>
      </div>
    </div>
    <el-dialog title="派单" width="30%" :visible.sync="showDispatchModal" :before-close="closeDispatchDialog">
      <dispatch-dialog v-on:close="closeDispatchDialog" :rows="currentRows" v-if="showDispatchModal"></dispatch-dialog>
    </el-dialog>
    <el-dialog title="派单记录" width="60%" :visible.sync="dispatchRecordModal" :before-close="closeDispatchRecordDialog">
      <dispatch-record v-on:close="closeDispatchRecordDialog" :rows="currentEditRow" v-if="dispatchRecordModal"></dispatch-record>
    </el-dialog>
    <el-dialog title="回收单导入" width="30%" :visible.sync="showImportModal" :before-close="closeImportDialog">
      <import-dialog v-on:close="closeImportDialog" v-if="showImportModal"></import-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { Error } from '@/common/js/uilt'
import mixin from '@/components/common/mixin'
import DispatchDialog from './DispatchDialog'
import DispatchRecord from './DispatchRecord'
import ImportDialog from './ImportDialog'
export default {
  name: 'Recycling',
  mixins: [mixin],
  components: { DispatchDialog, DispatchRecord, ImportDialog },
  data () {
    return {
      showDispatchModal: false,
      dispatchRecordModal: false,
      showImportModal: false,
      dialogTitle: '',
      formData: {
        pageNo: 1,
        pageSize: 10,
        dispatchStatus: -1,
        recyclingStatusList: [],
        storageStatusList: [],
        recyclingNo: '',
        fileNo: '',
        plateNo: '',
        repairShopName: '',
        staffName: '',
        organization: '',
        recyclingUserName: '',
        startCreateTime: '',
        endCreateTime: '',
        hasAccessory: -1
      },
      ifLoading: false,
      tableData: [],
      total: 0
    }
  },
  created () {
    this.getListData(1)
  },
  methods: {
    getListData (page) {
      if (this.ifLoading) return
      this.ifLoading = true
      this.formData.pageNo = page
      this.$api.queryRecyclingList(this.formData).then(rs => {
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
      this.formData.dispatchStatus = label
      this.getListData(1)
    },
    closeDispatchDialog () {
      this.showDispatchModal = false
      this.getListData(this.formData.pageNo)
    },
    dispatchRecyclingList () {
      if (!this.checkSelect()) return
      this.showDispatchModal = true
    },
    changeHasAccessory (label) {
      this.formData.hasAccessory = label
      this.getListData(1)
    },
    closeDispatchRecordDialog () {
      this.dispatchRecordModal = false
      this.getListData(this.formData.pageNo)
    },
    viewDispatchRecord () {
      if (!this.checkSelect()) return
      this.currentEditRow = this.currentRows[0]
      this.dispatchRecordModal = true
    },
    // 回收单导入
    closeImportDialog () {
      this.showImportModal = false
      this.getListData(this.formData.pageNo)
    },
    recyclingListImport () {
      this.showImportModal = true
    },
    deleteRecyclingList () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteRecyclingList(this.currentEditRow.recyclingNo).then(rs => {
          if (rs.data.retCode === this.$api.STATUS_OK) {
            this.getListData(this.formData.pageNo)
            Success('删除成功')
          } else {
            Error(rs.data.retMsg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
