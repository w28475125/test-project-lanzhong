<template>
  <div>
    <div class="head">
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="handleDetail">详情</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="form.typeId"
            placeholder="请选择筛选类型"
            clearable
          >
            <el-option
              v-for="item in newsTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-divider />

    <el-table border :data="tableData" v-loading="loading">
      <el-table-column label="选中" width="55">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            @change.native="getCurrentRow(scope.row)"
          >
            <i></i>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="id" label="序号"></el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="新闻标题"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="typeName"
        label="新闻类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="发布时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="numReprot"
        label="举报数量"
      ></el-table-column>
    </el-table>

    <pagination
      :total="total"
      :current="form.current"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />

    <detail ref="detailRef"></detail>
  </div>
</template>

<script>
import { getTableDataApi } from "@/api/managementType";
import { gettableDataApi } from "@/api/report";

import pagination from "@/components/pagination";
// 详情组件
import Detail from "./Detail";
export default {
  components: {
    pagination,
    Detail
  },
  data() {
    return {
      form: {
        typeId: "",
        current: 1,
        size: 10
      },
      newsTypeList: [],
      // 表格数据
      tableData: [],
      loading: true,
      total: 0,
      // 单选
      radio: "",
      templateSelection: ""
    };
  },
  created() {
    this.getNewsTypeList();
    this.getTableData();
  },
  methods: {
    // 查看详情
    handleDetail() {
      if (!this.templateSelection) {
        return this.$message({
          message: "请选择项目",
          type: "warning"
        });
      }
      this.$refs.detailRef.dialogVisible = true;
      this.$refs.detailRef.id = this.templateSelection.id;
    },
    // 获取类型
    async getNewsTypeList() {
      const data = await getTableDataApi();
      this.newsTypeList = data.data;
    },
    // 单选框选中
    getCurrentRow(row) {
      this.templateSelection = row;
    },
    // 获取表格数据
    async getTableData() {
      const data = await gettableDataApi(this.form);
      if (data.httpCode !== "0") {
        this.$message({
          message: data.msg,
          type: "error"
        });
        return false;
      }
      this.tableData = data.data;
      this.total = parseInt(data.total);
      this.current = parseInt(data.current);
      this.loading = false;
    },
    // 处理分页
    handleSizeChange(size) {
      this.form.size = size;
      this.getTableData();
    },
    handleCurrentChange(current) {
      this.form.current = current;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
}
</style>
