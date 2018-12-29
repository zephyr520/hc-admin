<template>
  <div>
    <div class="breadcrumb-bar">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item :to="{ path: '/wellcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </div>
    <div class="search-box">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" size="mini">
        <el-col :span="24">
          <el-form-item label="用户状态:">
            <el-button :type="formData.status === 'all' ? 'primary' : 'default'" @click="changeStatus('all')">全部</el-button>
            <el-button :type="formData.status === 'enable' ? 'primary' : 'default'" @click="changeStatus('enable')">正常</el-button>
            <el-button :type="formData.status === 'disable' ? 'primary' : 'default'" @click="changeStatus('disable')">禁用</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户名:">
            <el-input v-model="formData.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="formData.realName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="formData.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker :editable="false" v-model="formData.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间"></el-date-picker>
            <el-date-picker :editable="false" v-model="formData.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" v-access="'admin:user:query'" @click="getListData(1)">查询</el-button>
          <el-button size="mini" @click="doCreate" v-access="'admin:user:create'">新增</el-button>
          <el-button type="info" @click="doModify" size="mini" v-access="'admin:user:modify'">修改</el-button>
          <el-button type="danger" @click="doDelete" size="mini" v-access="'admin:user:delete'">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box" v-loading="ifLoading">
      <el-table ref="multipleTable" :data="tableData" highlight-current-row v-loading="ifLoading" size="mini" border style="width: 100%;" @selection-change="onTableSelect">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" width="40"></el-table-column>
        <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="80"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="用户手机号" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
        <el-table-column prop="genderStr" label="性别" width="50"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 'enable'">{{scope.row.statusStr}}</el-tag>
            <el-tag type="info" v-if="scope.row.status === 'disable'">{{scope.row.statusStr}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最后一次登录时间" min-width="150"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <div class="table-list-pager" v-if="tableData.length > 0">
        <el-pagination :total="total" @current-change="onPageChange" :page-size='formData.pageSize' :current-page="formData.pageNo" :layout="'total, prev, pager, next, jumper'" ></el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="showModal" :before-close="closeDialog">
      <add-dialog v-on:close="closeDialog" :editType="editType" :row="currentEditRow" v-if="showModal"></add-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { Success, Error } from '@/common/js/uilt'
import mixin from '@/components/common/mixin'
import AddDialog from './AddDialog'
export default {
  name: 'UserManage',
  mixins: [mixin],
  components: { AddDialog },
  data () {
    return {
      editType: '',
      showModal: false,
      dialogTitle: '',
      formData: {
        pageNo: 1,
        pageSize: 10,
        userName: '',
        realName: '',
        phone: '',
        status: 'all',
        startCreateTime: '',
        endCreateTime: ''
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
      this.$api.queryUserList(this.formData).then(rs => {
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
      this.formData.status = label
      this.getListData(1)
    },
    doDelete () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.currentEditRow = this.currentRows[0]
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteUser(this.currentEditRow.userId).then(rs => {
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
    closeDialog () {
      this.showModal = false
      this.getListData(this.formData.pageNo)
    },
    doCreate () {
      this.dialogTitle = '创建用户'
      this.showModal = true
      this.editType = 1
    },
    doModify () {
      if (!this.checkSelect()) return
      if (!this.checkMutiSelectOne()) return
      this.dialogTitle = '修改用户'
      this.showModal = true
      this.editType = 2
      this.currentEditRow = this.currentRows[0]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
