<template>
  <div>
    <el-alert :closable="false" style="margin-bottom:20px;">
      <div slot="title">
        请严格按照系统提供的数据模板格式填写客户信息
        <br>导入文件格式可以点击对应的'模板下载'按钮获得(支持.csv,.txt,.xlsx)
      </div>
    </el-alert>
    <el-form label-width="100px">
      <el-form-item label="模板下载：">
        <a
          class="href-link"
          href="http://vip.hysms.net/contact/exportTemplate.html?fileName=importContact.xlsx"
        >XLSX模版下载</a>
        <a
          class="href-link"
          href="http://vip.hysms.net//contact/exportTemplate.html?fileName=importContact.txt"
        >TXT模版下载</a>
        <a
          class="href-link"
          href="http://vip.hysms.net//contact/exportTemplate.html?fileName=importContact.csv"
        >CSV模版下载</a>
      </el-form-item>
      <el-form-item label="导入文件：">
        <el-upload
          ref="upload"
          action="/importContacts"
          :data="model"
          :auto-upload="false"
          :show-file-list="false"
          accept=".csv, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
      <el-form-item label="所属群组：">
        <el-select v-model="model.groupId" filterable>
          <el-option v-for="{id,label} in contactGroups" :key="id" :label="label" :value="id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      model: {
        groupId: null
      }
    };
  },

  computed: {
    contactGroups() {
      return this.$store.state.contactGroups || [];
    },

    fileName() {
      return this.file ? this.file.name : "";
    }
  },

  watch: {
    contactGroups: "initGroup"
  },

  created() {
    this.$store.dispatch("fetchContactGroups");
    this.initGroup();
  },

  methods: {
    initGroup() {
      if (this.contactGroups.length) {
        this.model.groupId = this.contactGroups[0].id;
      }
    },

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
