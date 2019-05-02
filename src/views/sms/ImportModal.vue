<template>
  <div>
    <el-alert :closable="false" style="margin-bottom:20px;">
      <div slot="title">
        温馨提醒:
        <br>1、您选择的文件须为CSV、TXT格式.
        <br>2、文件第一列须为手机号码，第一行须为标题， 标题中不能含有除中文，字母，数字及下划线以外的其它字符线以外的其它字符.
        <br>3、文件大小不超过5MB，导入手机号数量不超过10万
      </div>
    </el-alert>
    <el-form label-width="90px">
      <el-form-item label="模板下载：">
        <a
          class="href-link"
          href="http://vip.hysms.net//contact/exportTemplate.html?fileName=importContact.csv"
        >CSV模版下载</a>
        <a
          class="href-link"
          href="http://vip.hysms.net//contact/exportTemplate.html?fileName=importContact.txt"
        >TXT模版下载</a>
      </el-form-item>
      <el-form-item label="导入文件：">
        <el-upload
          ref="upload"
          action="/importContacts"
          :auto-upload="false"
          :show-file-list="false"
          accept=".csv, .txt"
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
    handleUploadSuccess({ code, message, data }) {
      if (code === 0) {
        this.$message.success(message);
        this.$emit("submitted", data);
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
