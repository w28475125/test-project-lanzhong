<template>
  <div class="detail">
    <div class="title">{{data.title}}</div>
    <div class="info">
      <div class="time">发布时间： {{ data.checkTime }}</div>
      <div class="author">来源： {{ data.createName }}</div>
      <div class="read-view">阅读量： {{ data.numReds }}</div>
      <div class="like">点赞量： {{ data.numZan }}</div>
    </div>
    <div class="content" v-html="data.content"></div>
  </div>
</template>

<script>
import { getNewsDetailApi } from "@/api/content"

export default {
  data() {
    return {
      data: {}
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
    async getDetailData() {
      const data = await getNewsDetailApi(this.id)
      if(data.httpCode !== "0"){
        return this.$message({
          message: data.msg,
          type: 'error'
        })
      }
      this.data = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    display: flex;
    flex-direction: column;
    .title{
      display: flex;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    .info{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }
    .content{
      text-align: center;
      text-indent: 24px;
    }
  }
</style>