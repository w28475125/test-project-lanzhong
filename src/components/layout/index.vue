<template>
  <el-container class="main-container">
    <el-header class="header-container">
      <div class="left">兰众云共享物管平台</div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>设置
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="loginOut">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>用户名称</span>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="210px">
        <LayoutAside :menuList="menuList"></LayoutAside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 修改密码组件 -->
    <change-password ref="changePasswordRef" />
  </el-container>
</template>

<script>
// 修改密码组件
import ChangePassword from "./ChangePassword/ChangePassword";
// 侧边栏
import LayoutAside from "./Aside/Aside";

import { loginOutApi } from "@/api/login";
export default {
  components: {
    ChangePassword,
    LayoutAside
  },
  data() {
    return {
      menuList: []
    };
  },
  created() {
    // 获取列表
    const menuList = JSON.parse(localStorage.getItem("menuList"));
    this.menuList = menuList;
  },
  methods: {
    async handleCommand(command) {
      // 修改密码
      if (command === "changePassword") {
        this.$refs.changePasswordRef.dialogVisible = true;
      }
      // 退出系统
      if (command === "loginOut") {
        const data = await loginOutApi();
        if (data.httpCode === "0") {
          localStorage.clear();
          sessionStorage.clear();
          this.$router.push("/login");
        }
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
  .el-aside {
    border-right: 1px solid #e6e6e6;
    .el-menu {
      border-right: none;
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
</style>
