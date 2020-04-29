<template>
  <div class="content">
    <el-form inline class="form-container">
      <el-form-item>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd hh:mm:ss"
          clearable
          size="mini"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="title"
          placeholder="请输入新闻名称搜索"
          size="mini"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="isTop" placeholder="是否置顶" size="mini" clearable>
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="typeId"
          placeholder="新闻类型"
          size="mini"
          clearable
        >
          <el-option
            v-for="item in newsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="getListData">
          <i class="el-icon-search"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.id"
        :label="item.title"
        :name="item.id + ''"
      >
        <item :list-data="listData" @onrefresh="getListData"></item>
      </el-tab-pane>
    </el-tabs>
    <!-- 筛选 -->

    <pagination
      :size="size"
      :total="total"
      :current="current"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import { enums } from "@/util/common";

import Item from "./item";
import pagination from "@/components/pagination";

import { getListDataApi } from "@/api/content";
import { getTableDataApi } from "@/api/managementType";
export default {
  components: {
    Item,
    pagination
  },
  data() {
    return {
      newsList: [],
      activeTab: "null",
      tabsList: enums.CONTENT_TAB,
      date: [],
      title: "",
      isTop: "",
      typeId: "",
      listData: [],
      total: 0,
      size: 4,
      current: 1
    };
  },
  created() {
    this.getListData();
    this.getNewsList();
  },
  methods: {
    // 获取新闻列表
    async getNewsList() {
      const data = await getTableDataApi();
      this.newsList = data.data;
    },
    // 获取列表数据
    async getListData() {
      const params = {
        isTop: this.isTop, // 是否置顶
        pageNum: this.current,
        pageSize: this.size,
        title: this.title,
        typeId: this.typeId,
        checkState: this.activeTab,
        publicTimeStart: this.date[0],
        publicTimeEnd: this.date[1]
      };
      const data = await getListDataApi(params);
      if (data.httpCode !== "0") {
        return this.$message({
          message: data.msg,
          type: "error"
        });
      }
      this.listData = data.data;
      this.total = parseInt(data.total);
      this.size = parseInt(data.size);
      this.current = parseInt(data.current);
    },
    handleClick() {
      this.current = 1;
      this.getListData();
    },
    // 分页
    handleSizeChange(size) {
      this.size = size;
      this.getListData();
    },
    handleCurrentChange(current) {
      this.current = current;
      this.getListData();
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  .form-container {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
