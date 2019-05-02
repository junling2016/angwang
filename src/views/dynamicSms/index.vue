<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card class="card-barrier" style="height: 720px;">
      <el-row :gutter="100">
        <el-col :span="15">
          <el-form ref="form" :model="model" :rules="rules" class="form-vertical">
            <el-form-item label="编辑短信内容：" prop="content">
              <sms-content-editor
                ref="contentEditor"
                v-model="model.content"
                :signature="userInfo.signature"
                placeholder="请输入短信内容"
              >
                <div slot="header">
                  <el-button type="text" @click="importModalVisible=true">导入动态数据</el-button>
                  <el-button type="text" @click="handleInsert('${m}')">插入手机后四位</el-button>
                  <el-button type="text" @click="handleInsert('${R}')">插入手机归属地</el-button>
                </div>
              </sms-content-editor>
            </el-form-item>

            <el-form-item prop="appointTime" :rules="dateTimeRules">
              <el-checkbox v-model="model.isAppoint">预约发送</el-checkbox>
              <label v-if="model.isAppoint">
                预约时间：
                <el-date-picker
                  v-model="model.appointTime"
                  type="datetime"
                  :disabled="model.appointType !== 1"
                  placeholder="选择日期时间"
                  style="width:200px;"
                ></el-date-picker>
              </label>
            </el-form-item>

            <el-form-item label="请输入短信接收号码：" prop="mdnList" required>
              <sms-content-editor
                ref="mdnEditor"
                v-model="model.mdnList"
                :show-footer="false"
                placeholder="手机号码/群组名，多个请用[;]隔开。最多只能输入1000个号码或群组，多于1000请采用导入方式"
              ></sms-content-editor>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSubmit">发 送</el-button>
              <el-button @click="handleReset">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" class="text-light description">
          <p>操作步骤说明:</p>
          <p>1、动态短信与短信发送区别是动态短信是每个号码发送的内容是不一样的，但都是根据同一个模板发送的，自己可以在输入内容框中自定义模板.</p>
          <p>2、上传完成后会把第一行的标题显示出来，点击标题后每一行对应的标题数据会动态拼接.</p>
          <p>3、 例子 :根据模板分别向 13764750703,13764750704发送两条不同的短信内容.具体输入内容为： 尊敬的{姓名}您好，您当月水费{水费}元，物业费{物业费}元，祝您生活愉快！(其中大括号的内容可以点击上面的标题获得)</p>
          <p>
            <img src="../../assets/images/help.png" style="width:100%;">
          </p>
          <p>
            4、发送后的内容为：号码为 13764750703 收到的短信内容为 :尊敬的张三您好，您当月水费222元，物业费3333元，祝您生活愉快！
            号码为 13764750704 收到的短信内容为：尊敬的李四您好，您当月水费223元，物业费3334元，祝您生活愉快！
          </p>
        </el-col>
      </el-row>
    </el-card>

    <aw-dialog :visible.sync="importModalVisible" title="导入接收号码" :width="600">
      <import-modal @submitted="handleImportSuccess"></import-modal>
    </aw-dialog>
  </div>
</template>

<script>
import { sendMessage } from "@/api/api";
import SmsContentEditor from "@/components/SmsContentEditor";
import AwDialog from "@/components/AwDialog";
import ImportModal from "./ImportModal";
import rules from "@/utils/rules";

export default {
  name: "contacts",

  components: {
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
    userInfo() {
      return this.$store.state.userInfo || {};
    },

    dateTimeRules() {
      return this.model.isAppoint ? rules.selectRequired : null;
    }
  },

  watch: {
    "model.isAppoint": "clearDatepickerValid"
  },

  created() {},

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
