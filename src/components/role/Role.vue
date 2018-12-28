<template>
  <div>
    <div class="breadcrumb-bar">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item :to="{ path: '/wellcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </div>
    <div class="search-box">
      <el-form :inline="true" ref="formData" :model="formData" class="demo-form-inline" size="mini">
        <el-col :span="24">
          <el-form-item label="角色名称:" prop="roleName">
            <el-input v-model="formData.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker :editable="false" v-model="formData.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间"></el-date-picker>
            <el-date-picker :editable="false" v-model="formData.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getListData(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box" v-loading="ifLoading">
      <el-table :data="tableData" highlight-current-row v-loading="ifLoading" size="mini" border style="width: 100%;">
        <el-table-column type="index" width="40"></el-table-column>
        <el-table-column prop="roleId" label="角色ID" width="80"></el-table-column>
        <el-table-column prop="roleNo" label="角色代码" width="80"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" min-width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column label="是否允许删除" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.ifOperate === true">{{scope.row.ifOperateStr}}</el-tag>
            <el-tag type="danger" v-if="scope.row.ifOperate === false">{{scope.row.ifOperateStr}}</el-tag>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import { Error } from '@/common/js/uilt'
import mixin from '@/components/common/mixin'
export default {
  name: 'Role',
  mixins: [mixin],
  data () {
    return {
      formData: {
        pageNo: 1,
        pageSize: 10,
        roleName: '',
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
      this.$api.queryRoleList(this.formData).then(rs => {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
