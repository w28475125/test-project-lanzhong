<template>
  <el-container class="main-container">
    <el-header class="header-container">
      <div class="left">logo</div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>设置
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>用户名称</span>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
    <!-- 修改密码组件 -->
    <change-password ref="changePasswordRef" />
  </el-container>
</template>


<script>
// 修改密码组件
import ChangePassword from "./ChangePassword/ChangePassword";
export default {
  components: {
    ChangePassword
  },
  methods: {
    handleCommand(command) {
      // 修改密码
      if (command === "changePassword") {
        this.$refs.changePasswordRef.dialogVisible = true;
      }
      // 退出系统
      if(command === "loginOut"){
          localStorage.clear()
          this.$router.push("/login")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .header-container {
    display: flex;
    justify-content: space-between;
    color: #fff;
    background-color: #367bff;
    .right {
      display: flex;
      width: 120px;
      justify-content: space-between;
      .el-dropdown-link {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>