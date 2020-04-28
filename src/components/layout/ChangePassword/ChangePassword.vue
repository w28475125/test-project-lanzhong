<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" label-position="top" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="请输入旧密码" prop="oldpassword">
        <el-input type="password" v-model="form.oldpassword"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newpassword">
        <el-input type="password" v-model="form.newpassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitPassword">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { changePassword } from "@/api/login"
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        oldpassword: "",
        newpassword: ""
      },
      rules: {
        oldpassword: [
          { required: true, message: "旧密码不可为空", trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "新密码不可为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   取消
    closeDialog() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //   弹框关闭前的回调
    handleClose(done) {
      this.$refs.form.resetFields();
      done();
    },
    submitPassword() {
        this.$refs.form.validate(async valid => {
            if(valid){
                const data = await changePassword(this.form)
                if(data.httpCode === "0"){
                    this.$message({
                        message: "修改成功，请重新登录",
                        type: 'success',
                        onClose: () => {
                            localStorage.clear()
                            this.$router.push("/login")
                        }
                    })
                }else{
                    this.$message.error(data.message)
                }
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
  .dialog-footer{
    display: flex;
    justify-content: center;
  }
</style>