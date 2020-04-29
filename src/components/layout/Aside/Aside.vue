<template>
  <el-menu router :default-active="activePath">
    <el-submenu :index="item.request" v-for="item in menuList" :key="item.id">
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>{{ item.menuName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          @click="saveNavState('/home' + subItem.request)"
          :index="'/home' + subItem.request"
          v-for="subItem in item.childList"
          :key="subItem.id"
          >{{ subItem.menuName }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activePath: ""
    };
  },
  created() {
    this.activePath = sessionStorage.getItem("activePath");
  },
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>
