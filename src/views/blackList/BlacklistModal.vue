<template>
  <div>
    <el-alert title="温馨提醒：添加黑名单后，该号码将不能收到企业短信！" :closable="false" style="margin-bottom:20px;"></el-alert>
    <el-form ref="form" :model="model" :rules="rules" label-width="100px">
      <el-form-item label="手机号码：" prop="mdn">
        <el-input v-model="model.mdn"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="model.remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateBlacklist, addBlacklist } from "@/api/api";
import rules from "@/utils/rules";

export default {
  props: {
    props: Object
  },

  data() {
    return {
      model: {
        id: null,
        mdn: "",
        remark: ""
      },

      rules: {
        mdn: [rules.required, rules.phone]
      }
    };
  },

  created() {
    this.props && this.initModel();
  },

  methods: {
    initModel() {
      for (const prop in this.model) {
        this.model[prop] = this.props[prop];
      }
    },

    /**
     * 提交表单
     */
    async submit() {
      const submitApi = this.props ? updateBlacklist : addBlacklist;
      try {
        await this.$refs.form.validate();
        const { message } = await submitApi(this.model);
        this.$message.success(message);
        this.$emit("submitted");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>
