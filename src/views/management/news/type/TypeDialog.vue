<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="formRef" label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules">
      <el-form-item label="类型设置"  prop="name">
        <el-input v-model="formLabelAlign.name" :disabled="type === 'detail'"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="type !== 'detail'">
      <el-button type="primary" class="btn" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { newsTypeAddApi, newsTypeEditApi } from "@/api/managementType"
export default {
  data() {
    return {
      type: '',
      id: '',
      dialogVisible: false,
      formLabelAlign: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入类型', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    title() {
      if(this.type === "add"){
        return "新增"
      }else if(this.type == "edit"){
        return "编辑";
      }else{
        return "详情"
      }
    }
  },
  methods: {
    // 确定按钮
    handleSubmit(){
      this.$refs.formRef.validate( async valid => {
        if(!valid){ return false}
        let data = '';
        // 添加
        if(this.type === "add"){
          data = await newsTypeAddApi(this.formLabelAlign)
        // 编辑
        }else if(this.type === "edit"){
          const params = {
            id: this.id,
            name: this.formLabelAlign.name
          };
          data = await newsTypeEditApi(params)
        }
        // 请求失败
        if(data.httpCode !== "0"){
          this.$message({
            message: data.msg,
            type: 'error'
          });
          return false;
        }
        // 请求成功
        this.$message({
          message: data.msg,
          type: 'success',
          onClose: () => {
            this.dialogVisible = false
            this.$refs.formRef.resetFields()
            this.$parent.getTableData()
            this.clearParentData();
          }
        })
      })
    },

    handleClose(done) {
      this.$refs.formRef.resetFields()
      this.id = '';
      this.type = '';
      this.formLabelAlign.name = '';
      this.clearParentData();
      done();
    },
    // 清空父组件的数据
    clearParentData() {
      this.$parent.radio = '';
      this.$parent.templateSelection = '';
    },
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__body{
  padding: 0;
}
.dialog-footer{
  display: flex;
  justify-content: center;
  .btn{
    width: 100%;
  }
}
</style>