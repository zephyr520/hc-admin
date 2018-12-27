const mixin = {
  data () {
    return {
      editType: '', // 1：新增，2：编辑
      formData: {
        pageNo: 1,
        pageSize: 10
      },
      currentRows: [], // 多选，当前选中的选项
      currentEditRow: {}, // 单选，当前选中的选项
      ifLoading: false, // 表格数据是否加载中
      tableData: [] // 表格数据
    }
  },
  methods: {
    // 表格多选
    onTableSelect (selection) {
      this.currentRows = selection
    },
    // 表格单选
    onCurrentChange (currentRow, oldCurrentRow) {
      this.currentEditRow = currentRow
    },
    // 确认是否选择了一条记录
    checkSelect () {
      if (this.currentRows.length <= 0) {
        this.$message.error('请先勾选一条记录再操作')
        return false
      }
      return true
    },
    // 多选时，只能勾选一个
    checkMutiSelectOne () {
      if (this.currentRows.length !== 1) {
        this.$message.error('只能勾选一条记录进行操作')
        return false
      }
      return true
    },
    // 检查是否选择了一条记录
    checkSingleSelect (key) {
      if (!this.currentEditRow[key]) {
        this.$message.error('请选择一条记录')
        return false
      }
      return true
    },
    // 清除多选
    clearMutiSelect () {
      this.currentRows = []
    },
    // 清除单选
    clearSingleSelect () {
      this.currentEditRow = {}
    }
  }
}

export default mixin
