<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="100px">
    <el-form-item label="关键字：" prop="keyword">
      <el-input v-model="model.keyword"></el-input>
    </el-form-item>
    <el-form-item label="内容：" prop="content">
      <el-input v-model="model.content" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="生效时间：" prop="create_time">
      <el-date-picker v-model="model.create_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>
    <el-form-item label="失效时间：" prop="drop_time">
      <el-date-picker v-model="model.drop_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
import rules from "@/utils/rules";
import { addDemand } from "@/api/api";
import { timeFormat } from "@/utils/time";

export default {
  data() {
    return {
      model: {
        keyword: "",
        content: "",
        create_time: null,
        drop_time: null
      },

      rules: {
        keyword: [rules.required]
      }
    };
  },

  methods: {
    timeFormat() {},

    async submit() {
      try {
        await this.$refs.form.validate();

        const { model } = this;
        const { message } = await addDemand({
          ...model,
          create_time: timeFormat(model.create_time),
          drop_time: timeFormat(model.drop_time)
        });

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
