<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2" v-if="listData.length && listData.length > 0">
        <div class="item" v-for="item in listData" :key="item.id">
          <div class="img" v-if="item.picCover && item.picCoverPos !== 2">
            <el-image :src="item.picCover"></el-image>
          </div>
          <div class="info-container">
            <div class="title" @click="examineDetail(item.id)">{{ item.title }}</div>
            <div class="info">
              <div class="tag">
                <el-tag effect="plain" type="info" v-if="item.isTop == 1">置顶</el-tag>
                <el-tag effect="plain" type="info" v-if="item.resource == 0">原创</el-tag>
                <el-tag effect="plain" v-if="item.checkState == 0">未审核</el-tag>
                <el-tag effect="plain" type="success" v-if="item.checkState == 1">审核通过</el-tag>
                <el-tag effect="plain" type="warning" v-if="item.checkState == 2">审核未通过</el-tag>
                <el-tag effect="plain" type="danger" v-if="item.checkState == 3">停用</el-tag>
                <!-- checkState //0 未审核；1审核通过；2审核未通过；3停用 -->
              </div>
              <div class="time">{{ item.createTime }}</div>
              <div class="review">
                <span>
                  <i class="el-icon-view"></i>
                  {{ item.numReds }}
                </span>
                <span>
                  <i class="el-icon-star-on"></i>
                  {{ item.numZan }}
                </span>
                <span>
                  <i class="el-icon-share"></i>
                  {{ item.numShare }}
                </span>
              </div>
            </div>
          </div>
          <div class="img" v-if="item.picCover && item.picCoverPos === 2">
            <el-image :src="item.picCover"></el-image>
          </div>
          <div class="btns">
            <el-link :underline="false" v-if="item.checkState != 3" @click="blockUp(item.id)">
              <i class="el-icon-video-pause"></i>停用
            </el-link>
            <el-link :underline="false" v-if="item.checkState == 0" @click="handleAudit(item)">
              <i class="el-icon-s-check"></i>审核发布
            </el-link>
            <el-link :underline="false" @click="editStatus(item)">
              <i class="el-icon-edit-outline"></i>修改
            </el-link>
          </div>
        </div>
      </el-col>
      <el-col :span="20" :offset="2" v-else>
        <div style="text-align:center;margin:20px 0;">暂无数据</div>
      </el-col>
    </el-row>
    <!-- 修改状态 -->
    <el-dialog title="修改状态" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <div>
        <el-form>
          <el-form-item label="状态">
            <el-select v-model="value" placeholder="请选择状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setNewsStatus } from "@/api/content";
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      statusList: [
        { id: 0, title: "未审核" },
        { id: 1, title: "审核通过" },
        { id: 2, title: "审核未通过" },
        { id: 3, title: "停用" }
      ],
      dialogVisible: false,
      value: "",
      id: '',
    };
  },
  methods: {
    // 查看详情
    examineDetail(id){
      this.$router.push({path: "/home/management/news/content/detail", query: {id: id}})
    },
    handleClose(done) {
      this.value = ''
      this.id = '';
      done()
    },
    // 修改状态 打开弹框
    editStatus(row) {
      this.id = row.id
      this.dialogVisible = true;
    },
    // 确定修改状态
    handleChangeStatus(){
      this.changeStatus(this.id, this.value)
      this.dialogVisible = false;
    },
    // 停用
    blockUp(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息提示",
        message: h("p", null, "您确定要停用该新闻吗？"),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        const params = {
          id,
          checkState: 3
        };
        const data = await setNewsStatus(params);
        if (data.httpCode !== "0") {
          return this.$message({
            message: data.msg,
            type: "error"
          });
        }
        this.$message({
          message: data.msg,
          type: "success",
          onClose: () => {
            // 刷新父组件的数据
            this.$emit("onrefresh");
          }
        });
      });
    },
    // 审核
    handleAudit(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: "审核",
        showCancelButton: true,
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        message: h("div", null, [
          h("p", { style: "text-align:center" }, "该文章是否通过审核"),
          h(
            "p",
            { style: "text-align:center" },
            `定时发布时间： ${row.checkTime ? row.checkTime : "无"}`
          )
        ])
      })
        // 通过
        .then(() => {
          this.changeStatus(row.id, 1);
        })
        // 不通过
        .catch(() => {
          this.auditNoPass(row);
        });
    },
    // 审核不通过理由
    auditNoPass(row) {
      this.$prompt(null, "请输入新闻不通过的原因", {
        confirmButtonText: "确定",
        inputValue: "内容违规\n含敏感词汇"
      }).then(() => {
        this.changeStatus(row.id, 2);
      });
    },
    // 修改状态
    async changeStatus(id, status) {
      const params = {
        id,
        checkState: status
      };
      const data = await setNewsStatus(params);
      if (data.httpCode !== "0") {
        return this.$message({
          message: data.msg,
          type: "error"
        });
      }
      this.$message({
        message: data.msg,
        type: "success",
        onClose: () => {
          this.$emit("onrefresh");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 2px solid #eee;
  padding: 10px 0;
  display: flex;
  min-height: 100px;
  .img {
    width: 150px;
    height: 100px;
    margin-right: 10px;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .info-container {
    flex: 3;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0 10px;
    .title {
      font-weight: bold;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tag {
        .el-tag {
          margin-right: 5px;
        }
      }
      .review {
        width: 200px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .btns {
    width: 200px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
}
</style>
