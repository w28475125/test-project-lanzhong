<template>
  <el-row class="pagination-container">
    <el-col>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default() {
        return 0;
      }
    },
    current: {
      type: Number,
      default() {
        return 1;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
    handleCurrentChange(current) {
      this.$emit("handleCurrentChange", current);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination-container {
  margin-top: 10px;
  text-align: right;
}
</style>
