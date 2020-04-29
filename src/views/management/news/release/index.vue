<template>
  <div>
    <el-form label-width="80px">
      <el-form-item>
        <el-row>
          <el-col :span="2" :offset="22">
            <el-button type="primary">上传文档</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="文章标题">
        <!-- title -->
        <el-input
          type="text"
          placeholder="请输入文章标题(5-30个汉字)"
          v-model="title"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- 编辑器 -->
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @change="onEditorChange($event)"
        />
      </el-form-item>

      <!-- 新闻类型 -->
      <el-form-item label="新闻类型">
        <el-select v-model="newsTypeId" placeholder="请选择新闻类型">
          <el-option
            v-for="item in newsTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="封面">
        <el-radio-group v-model="coverType">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">单面</el-radio>
          <el-radio :label="3">三面</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上传图片" v-show="coverType">
        <el-upload
          v-for="(item, index) in coverType" :key="index"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          class="upload-box"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章设置">
        <el-radio-group v-model="articleSetting">
          <el-radio :label="1">原创</el-radio>
          <el-radio :label="2">转载</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="转载来源" v-show="articleFlag">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input v-model="articleTitle" placeholder="请输入转载来源名称"></el-input>
          </el-col>
          <el-col :span="11">
            <el-input v-model="articleUrl" placeholder="请输入转载来源地址"></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="文章置顶">
        <el-radio-group v-model="articleStick">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="form-btn">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="info">定时发布</el-button>
        <el-button type="info">预览</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import { getTableDataApi } from "@/api/managementType";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      title: "",
      content: "",
      newsTypeId: "",
      editorOption: {},
      newsTypeList: [],
      // 封面
      coverType: 0,
      // 文章设置
      articleSetting: "",
      articleFlag: false,
      articleTitle: "",
      articleUrl: "",
      // 文章置顶
      articleStick: "",
      formValid: true,
    };
  },
  created() {
    this.getNewsTypeList();
  },
  watch: {
    articleSetting(newV) {
      this.articleFlag = newV === 1 ? false : true;
    }
  },
  methods: {
    onEditorChange(e) {
      this.content = e.html;
    },
    // 请求新闻类型
    async getNewsTypeList() {
      const data = await getTableDataApi();
      this.newsTypeList = data.data;
    },
    // 提交
    handleSubmit() {
      if(!this.title)this.formValid = false;
      if(!this.content)this.formValid = false;
      if(!this.newsTypeId)this.formValid = false;
      if(this.articleSetting == 2 && !(this.articleTitle && this.articleUrl))this.formValid = false;
      if(!this.articleStick)this.formValid = false;
      if(!this.formValid){
        this.$message({
          message: "请完善新闻内容",
          type: 'error'
        })
        return false;
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw))
      console.log(res)
    }
  }
};
</script>

<style lang="scss" scoped>
.form-btn {
  text-align: center;
}
.upload-box{
  display: inline-block;
  margin-right: 10px;
}
</style>