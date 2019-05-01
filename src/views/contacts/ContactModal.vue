<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="90px">
    <el-form-item label="手机号码：" prop="mdn">
      <el-input v-model="model.mdn"></el-input>
    </el-form-item>
    <el-form-item label="姓名：" prop="name">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="性别：" prop="sex">
      <el-radio-group v-model="model.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄：" prop="age">
      <el-input v-model="model.age"></el-input>
    </el-form-item>
    <el-form-item label="部门：" prop="departmentId">
      <el-select v-model="model.departmentId" filterable clearable>
        <el-option v-for="{id,name} in departments" :key="id" :label="name" :value="id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期：" prop="birthday">
      <el-date-picker v-model="model.birthday" type="date"></el-date-picker>
    </el-form-item>
    <el-form-item label="所属群组：" prop="groupId">
      <el-select v-model="model.groupId" filterable clearable>
        <el-option v-for="{id,label} in contactGroups" :key="id" :label="label" :value="id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
import rules from "@/utils/rules";
import { addContact, updateContact } from "@/api/api";

export default {
  props: {
    props: Object
  },

  data() {
    return {
      model: {
        id: null,
        mdn: "",
        name: "",
        sex: "0",
        age: "",
        birthday: null,
        departmentId: null,
        groupId: null
      },
      rules: {
        mdn: [rules.required, rules.phone],
        age: [rules.positiveInt]
      }
    };
  },

  computed: {
    contactGroups() {
      return this.$store.state.contactGroups || [];
    },

    departments() {
      return this.$store.state.departments || [];
    }
  },

  created() {
    this.$store.dispatch("fetchContactGroups");
    this.$store.dispatch("fetchDepartments");

    if (this.props) {
      this.initModel();
    }
  },

  methods: {
    initModel() {
      for (const prop in this.model) {
        if (prop === "birthday") {
          this.model[prop] = moment(this.props[prop]);
        } else {
          this.model[prop] = this.props[prop];
        }
      }
    },

    /**
     * 提交表单
     */
    async submit() {
      const submitApi = this.props ? updateContact : addContact;
      try {
        await this.$refs.form.validate();
        const birthday = moment(this.model.birthday).format("YYYY-MM-DD");
        const { message } = await submitApi({ ...this.model, birthday });
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
