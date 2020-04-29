<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-table border :data="tableData">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="reprotName" label="举报人"></el-table-column>
      <el-table-column prop="reprotPhone" label="电话"></el-table-column>
      <el-table-column prop="reprotReason" label="举报原因"></el-table-column>
      <el-table-column prop="createTime" label="举报时间"></el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDetailDataApi } from "@/api/report";
export default {
  data() {
    return {
      dialogVisible: false,
      id: "",
      tableData: []
    };
  },
  watch: {
    dialogVisible(newV) {
      newV && this.getDetailData();
    }
  },
  methods: {
    // 获取详情数据
    async getDetailData() {
      const data = await getDetailDataApi(this.id);
      if (data.httpCode !== "0") {
        return this.$message({
          message: data.msg,
          type: "error"
        });
      }
      this.tableData = data.data;
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
