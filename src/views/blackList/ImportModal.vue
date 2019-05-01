<template>
  <div>
    <el-alert :closable="false" style="margin-bottom:20px;">
      <div slot="title">
        请上传包含客户信息的文件，上传文件格式可以点击对应的“模板下载按钮获得
        <br>请严格按照系统提供的数据模板格式填写客户信息
      </div>
    </el-alert>
    <el-form label-width="100px">
      <el-form-item label="模板下载：">
        <a
          class="href-link"
          href="http://vip.hysms.net/contact/exportTemplate.html?fileName=importContact.xlsx"
        >模版下载</a>
      </el-form-item>
      <el-form-item label="导入文件：">
        <!-- action为导入接口 -->
        <el-upload
          ref="upload"
          action="/importBlacklist"
          :auto-upload="false"
          :show-file-list="false"
          accept=".csv"
          :on-change="handleFileChange"
          :on-success="handleUploadSuccess"
        >
          <el-button slot="trigger" type="primary">选择导入文件</el-button>
          <ul class="el-upload-list el-upload-list--text">
            <li class="el-upload-list__item">
              <a v-if="file" class="el-upload-list__item-name">
                <i class="el-icon-document"></i>
                {{fileName}}
              </a>
            </li>
          </ul>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },

  computed: {
    fileName() {
      return this.file ? this.file.name : "";
    }
  },

  methods: {
    handleFileChange(file) {
      this.file = file;
    },

    /**
     * 导入结果
     */
    handleUploadSuccess({ code, message }) {
      if (code === 0) {
        this.$message.success(message);
        this.$emit("submitted");
      } else {
        this.$message.error(message);
      }
    },

    submit() {
      if (!this.file) {
        return this.$message.warning("请选择导入文件");
      }
      this.$refs.upload.submit();
    }
  }
};
</script>

<style>
</style>
