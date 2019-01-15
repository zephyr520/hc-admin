<template>
  <div>
    <div style="height: auto;">
      <el-steps :active="100" align-center>
        <el-step  v-for="(item, index) in recyclingDispatchRecordList" :key="index" :title="item.recyclingUserNameStr" :description="item.expireDateStr"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'rows' ],
  data () {
    return {
      recyclingDispatchRecordList: []
    }
  },
  created () {
    this.getRecyclingDispatchRecordList(this.rows.recyclingNo)
  },
  methods: {
    getRecyclingDispatchRecordList (recyclingNo) {
      this.$api.queryRecyclingDispatchRecordList(recyclingNo).then(rs => {
        if (rs.data.retCode === this.$api.STATUS_OK) {
          this.recyclingDispatchRecordList = rs.data.data || []
        }
      })
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
