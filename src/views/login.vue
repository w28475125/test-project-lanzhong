<template>
  <div class="login">
    <div class="form">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input prefix-icon="el-icon-user" v-model="formLabelAlign.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login, getMenuList } from "@/api/login";
export default {
  data() {
    return {
      formLabelAlign: {
        account: "13212345678",
        password: "123456"
      }
    };
  },
  methods: {
    async login() {
      const res = await login(this.formLabelAlign);
      if (res.httpCode === "0") {
        localStorage.setItem("login", true);
        this.getMenuList(); // 获取用户菜单
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: "error"
        });
      }
    },
    async getMenuList() {
      const params = {
        menuType: 0,
        parentId: "983967556477370370"
      };
      const data = await getMenuList(params);
      const menuList = data.data;
      localStorage.setItem("menuList", JSON.stringify(menuList));
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00a6ff;
  background-image: url('https://sys.lanzhongyun.cn/static/img/login111.facfa23.png');
  .form {
    padding: 30px;
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
  .login-btn {
    width: 100%;
  }
}
</style>