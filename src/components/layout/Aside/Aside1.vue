<template>
  <el-menu collapse mode="vertical">
    <el-submenu index="item.request">
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>新闻管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item router index="/home/management/news/type"
          >类型设置</el-menu-item
        >
        <el-menu-item router index="/home/management/news/release"
          >新闻发布</el-menu-item
        >
        <el-menu-item router index="/home/management/news/content"
          >内容管理</el-menu-item
        >
        <el-menu-item router index="/home/management/news/report"
          >举报记录</el-menu-item
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
  methods: {}
};
</script>
