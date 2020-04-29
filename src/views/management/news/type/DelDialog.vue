<template>
  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
    <div class="text-center">
      <i class="el-icon-warning"></i>确定执行此操作？
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { newsTypeDelApi } from "@/api/managementType";
export default {
  data() {
    return {
      centerDialogVisible: false,
      params: {}
    };
  },
  methods: {
    async handleSubmit() {
      const data = await newsTypeDelApi(this.params.id);
      if (data.httpCode !== "0") {
        this.$message({
          message: data.msg,
          type: "error"
        });
        return false;
      }
      this.$message({
        message: data.msg,
        type: "success",
        onClose: () => {
          // 关闭弹框
          this.centerDialogVisible = false;
          // 清空单选框
          this.$parent.radio = "";
          this.$parent.templateSelection = "";
          // 重新获取数据
          this.$parent.getTableData();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .text-center{
    text-align: center;
    .el-icon-warning::before{
      color: #ffcb0cee;
    }
  }
</style>