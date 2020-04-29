<template>
  <div class="content">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabsList" :key="item.id" :label="item.title" :name="item.id+''">
        <item :list-data="listData"></item>
      </el-tab-pane>
    </el-tabs>
    <!-- 筛选 -->
    <el-form inline class="form-container">
      <el-form-item>
        <el-date-picker v-model="date" type="date" placeholder="选择日期" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="newsTitle" placeholder="请输入新闻名称搜索" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="newsType" placeholder="是否置顶" size="mini">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="newsType" placeholder="新闻类型" size="mini">
          <el-option label="物管新闻" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini">
          <i class="el-icon-search"></i>
        </el-button>
      </el-form-item>
    </el-form>

    <pagination :size="size" :total="total" :current="current" />
  </div>
</template>
<script>
import { enums } from "@/util/common"

import Item from "./item"
import pagination from "@/components/pagination"

import { getListDataApi } from "@/api/content"
export default {
  components: {
    Item,
    pagination
  },
  data() {
    return {
      activeTab: '1',
      tabsList: enums.CONTENT_TAB,
      date: "",
      newsTitle: "",
      newsType: "",
      listData: [],
      total: 0,
      size: 10,
      current: 1
    };
  },
  created() {
    this.getListData()
  },
  methods: {
    // 获取列表数据
    async getListData() {
      const data = await getListDataApi()
      if(data.httpCode !== "0"){
        return this.$message({
          message: data.msg,
          type: 'error'
        });
      }
      this.listData = data.data
      this.total = parseInt(data.total);
      this.size = parseInt(data.size);
      this.current = parseInt(data.current)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.content{
  position: relative;
  .form-container{
    position: absolute;
    top: 0;
    right: 0;
  }

}
</style>