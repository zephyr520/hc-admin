<template>
  <div>
    <div class="breadcrumb-bar">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item :to="{ path: '/wellcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          <el-breadcrumb-item>消息中心</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </div>
    <div class="search-box">
      <el-form :inline="true" :ref="form" class="demo-form-inline" size="mini">
        <el-col :span="24">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
          <el-button size="mini">新增</el-button>
          <el-button type="info" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box" v-loading="ifLoading">
      <el-table :data="tableData" highlight-current-row v-loading="ifLoading" size="mini" border style="width: 100%;">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" width="40"></el-table-column>
        <el-table-column prop="date" label="日期" width="120" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
        <el-table-column prop="province" label="省份" width="100" sortable></el-table-column>
        <el-table-column prop="city" label="城市" width="120" sortable></el-table-column>
        <el-table-column prop="address" label="地址" min-width="180" sortable></el-table-column>
        <el-table-column prop="zip" label="邮编" min-width="180" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <div class="table-list-pager" v-if="tableData.length > 0">
        <el-pagination :total="total" @current-change="onPageChange" :page-size='form.pageSize' :current-page="form.pageNo" :layout="'total, prev, pager, next, jumper'" ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const item = {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }
    return {
      form: {
        pageNo: 1,
        pageSize: 5,
        user: '',
        region: ''
      },
      ifLoading: false,
      tableData: Array(10).fill(item),
      total: 20
    }
  },
  methods: {
    onPageChange () {
      console.log('onPageChange')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
