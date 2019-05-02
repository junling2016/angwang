<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card class="card-barrier" style="height: 720px;">
      <div class="card-sidebar">
        <div class="card-sidebar-header">
          <h4>选择接收人</h4>
        </div>
        <div class="card-sidebar-body">
          <contact-group-tree></contact-group-tree>
        </div>
      </div>
      <div class="card-right">
        <el-form ref="form" :model="model" :rules="rules" class="form-vertical">
          <el-form-item label="编辑短信内容：" prop="content">
            <sms-content-editor
              ref="contentEditor"
              v-model="model.content"
              :signature="userInfo.signature"
              placeholder="请输入短信内容"
            >
              <div slot="header">
                <el-button type="text" @click="handleInsert('${#}')">插入手机后四位</el-button>
                <el-button type="text" @click="handleInsert('${R}')">插入手机归属地</el-button>
              </div>
            </sms-content-editor>
          </el-form-item>

          <el-form-item prop="appointTime" :rules="dateTimeRules">
            <el-checkbox v-model="model.isAppoint">预约发送</el-checkbox>

            <el-radio-group v-if="model.isAppoint" v-model="model.appointType">
              <el-radio :label="1">
                预约时间：
                <el-date-picker
                  v-model="model.appointTime"
                  type="datetime"
                  :disabled="model.appointType !== 1"
                  placeholder="选择日期时间"
                  style="width:200px;"
                ></el-date-picker>
              </el-radio>
              <el-radio :label="2">生日发送</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="请输入短信接收号码：" prop="mdnList" required>
            <sms-content-editor
              ref="mdnEditor"
              v-model="model.mdnList"
              :show-footer="false"
              placeholder="手机号码/群组名，多个请用[;]隔开。最多只能输入1000个号码或群组，多于1000请采用导入方式"
            >
              <div v-if="!(model.isAppoint && model.appointType===2)" slot="header">
                <el-button type="text" @click="importModalVisible = true">导入接收号码</el-button>
              </div>
            </sms-content-editor>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit">发 送</el-button>
            <el-button @click="handleReset">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <aw-dialog :visible.sync="importModalVisible" title="导入接收号码" :width="600">
      <import-modal @submitted="handleImportSuccess"></import-modal>
    </aw-dialog>
  </div>
</template>

<script>
import { sendMessage } from "@/api/api";
import ContactGroupTree from "./ContactGroupTree";
import SmsContentEditor from "@/components/SmsContentEditor";
import AwDialog from "@/components/AwDialog";
import ImportModal from "./ImportModal";
import rules from "@/utils/rules";

export default {
  name: "contacts",

  components: {
    ContactGroupTree,
    SmsContentEditor,
    ImportModal,
    AwDialog
  },

  data() {
    return {
      groupId: null,
      model: {
        content: "",
        isAppoint: false,
        appointType: 1,
        appointTime: null,
        mdnList: ""
      },

      importModalVisible: false,

      rules: {
        content: rules.required,
        mdnList: rules.required
      }
    };
  },

  computed: {
    queryContent() {
      return this.$route.query.content;
    },

    userInfo() {
      return this.$store.state.userInfo || {};
    },

    dateTimeRules() {
      return this.model.isAppoint && this.model.appointType === 1
        ? rules.selectRequired
        : null;
    }
  },

  watch: {
    "model.isAppoint": "clearDatepickerValid",
    "model.appointType": "clearDatepickerValid"
  },

  created() {
    if (this.queryContent) {
      this.model.content = this.queryContent;
    }
  },

  methods: {
    /**
     * checkbox和radio切换时，清除日期控件的校验痕迹
     */
    clearDatepickerValid() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate(["appointTime"]);
      });
    },

    /**
     * 插入内容
     */
    handleInsert(val) {
      this.$refs.contentEditor.insertText(val);
    },

    /**
     * 导入成功以后，进行后续处理
     */
    handleImportSuccess(resData) {
      console.log(resData);
    },

    async handleSubmit() {
      try {
        await this.$refs.form.validate();

        this.doSubmit();
      } catch (err) {
        this.$message.error("校验未通过，请检查填写是否完善");
      }
    },

    async doSubmit() {
      try {
        const { message } = await sendMessage(this.model);
        this.$message.success(message);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * 重置
     */
    handleReset() {
      const { model: originModel } = this.$options.data();

      for (const prop in this.model) {
        this.model[prop] = originModel[prop];
      }
    }
  }
};
</script>

<style>
</style>
