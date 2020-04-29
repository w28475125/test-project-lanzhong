<template>
  <div>
    <div class="table-head">
      <div class="btns">
        <el-button type="primary" @click="handleBtn('add')" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button type="primary" @click="handleBtn('edit')" icon="el-icon-edit-outline">修改</el-button>
        <el-button type="primary" @click="handleBtn('detail')" icon="el-icon-document">详情</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="delTableData">删除</el-button>
      </div>
      <div class="form">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入新闻类型进行搜索" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider></el-divider>
    <el-table border :data="tableData" v-loading="loading">
      <el-table-column align="center" fixed="left" width="55">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">
            <i></i>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createBy" label="序号"></el-table-column>
      <el-table-column align="center" prop="name" label="类型名称"></el-table-column>
      <el-table-column align="center" prop="createName" label="创建人"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
    </el-table>
    <pagination
      :current="current"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>

    <type-dialog ref="TypeDialogRef"></type-dialog>
    <del-dialog ref="DelDialogRef"></del-dialog>
  </div>
</template>

<script>
import { getTableDataApi } from "@/api/managementType";

// 分页组件
import pagination from "@/components/pagination";

// 自定义弹框
import TypeDialog from "./TypeDialog";
import DelDialog from "./DelDialog";

export default {
  components: {
    pagination,
    TypeDialog,
    DelDialog
  },
  data() {
    return {
      form: {
        name: "",
        pageSize: 10,
        pageNum: 1
      },
      radio: "",
      templateSelection: "",
      tableData: [],
      loading: true,
      total: 0,
      current: 1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      this.loading = true;
      const data = await getTableDataApi(this.form);
      if (data.httpCode !== "0") {
        this.$message.error(data.message);
      }
      this.tableData = data.data;
      this.current = parseInt(data.current);
      this.total = parseInt(data.total);
      this.loading = false;
    },
    // 表格单选
    getCurrentRow(row) {
      this.templateSelection = row;
    },
    // 按钮组
    async handleBtn(type) {
      if (type === "edit") {
        if (!this.templateSelection) {
          this.$message({
            message: "请选择项目",
            type: "warning"
          });
          return false;
        }
        this.$refs.TypeDialogRef.type = type;
        this.$refs.TypeDialogRef.id = this.templateSelection.id;
        this.$refs.TypeDialogRef.formLabelAlign.name = this.templateSelection.name;
      }
      if (type == "detail") {
        if (!this.templateSelection) {
          this.$message({
            message: "请选择项目",
            type: "warning"
          });
          return false;
        }
        this.$refs.TypeDialogRef.type = type;
        this.$refs.TypeDialogRef.formLabelAlign.name = this.templateSelection.name;
        // const data = await newTypeDetailApi({id:this.templateSelection.id})
        // console.log(data)
      }
      // 添加
      if (type === "add") {
        this.$refs.TypeDialogRef.type = "add";
      }
      this.$refs.TypeDialogRef.dialogVisible = true;
    },
    // 删除项目
    async delTableData() {
      if (!this.templateSelection) {
        this.$message({
          message: "请选择项目",
          type: "warning"
        });
        return false;
      }
      this.$refs.DelDialogRef.centerDialogVisible = true;
      this.$refs.DelDialogRef.params = this.templateSelection;
    },
    // 分页
    handleSizeChange(size) {
      this.form.pageSize = size;
      this.getTableData();
    },
    handleCurrentChange(current) {
      this.form.pageNum = current;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-head {
  display: flex;
  justify-content: space-between;
}
</style>