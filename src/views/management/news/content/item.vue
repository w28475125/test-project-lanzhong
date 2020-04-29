<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <div class="item">
        <div class="img">
          <img src="https://t11.baidu.com/it/u=4160846947,4100080746&fm=76" alt="">
        </div>
        <div class="info-container">
          <div class="title">收到收到收到收到收到到收到收到收到收到收到收到</div>
          <div class="info">
            <div class="tag">
              <el-tag>标签一</el-tag>
              <el-tag effect="plain">标签一</el-tag>
            </div>
            <div class="time">2020-4-29 15:31:13</div>
            <div class="review">
              <span><i class="el-icon-view"></i>123</span>
              <span><i class="el-icon-star-on"></i>4567</span>
              <span><i class="el-icon-share"></i>123</span>
            </div>
          </div>
        </div>
        <div class="btns">123123</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .item{
    border-bottom: 2px solid #eee;
    padding: 10px 0;
    display: flex;
    .img{
      width: 150px;
      height: 100px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%
      }
    }
    .info-container{
      flex: 3;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .title{
        font-weight: bold;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .info{
        display: flex;
        justify-content: space-between;
        .tag{
          .el-tag{
            margin-right: 5px;
          }
        }
        .review{
          width: 200px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>