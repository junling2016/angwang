<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="130px">
    <el-form-item label="所属类别：" prop="group">
      <el-select v-model="model.groupId">
        <el-option v-for="item in groups" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="常用短语内容：" prop="content">
      <el-input v-model="model.content" type="textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import rules from "@/utils/rules";
import { addTemplate, updateTemplate } from "@/api/api";

export default {
  props: {
    props: Object,
    groups: Array
  },

  data() {
    return {
      model: {
        groupId: "",
        content: ""
      },

      rules: {
        content: [rules.required]
      }
    };
  },

  created() {
    if (this.props) {
      for (const prop in this.model) {
        this.model[prop] = this.props[prop];
      }
    } else if (this.groups.length) {
      this.model.groupId = this.groups[0].id;
    }
  },

  methods: {
    async submit() {
      try {
        await this.$refs.form.validate();

        const submitApi = this.props ? updateTemplate : addTemplate;
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
