<template>
  <div>
    <el-alert
      title="因导出通讯录全部号码会影响系统性能，所以每次最多只能导出1万个号码，如需更多请联系客服处理"
      :closable="false"
      style="margin-bottom:20px;"
    ></el-alert>
    <el-form label-width="100px">
      <el-form-item label="所属群组：">
        <el-select v-model="model.groupId" filterable>
          <el-option v-for="{id,label} in contactGroups" :key="id" :label="label" :value="id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { exportContacts } from "@/api/api";

export default {
  data() {
    return {
      model: {
        groupId: null
      }
    };
  },

  computed: {
    contactGroups() {
      return this.$store.state.contactGroups || [];
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

    async submit() {
      try {
        await exportContacts(this.model);
      } catch (err) {
        console.log(err);
      }

      this.$emit("submitted");
    }
  }
};
</script>

<style>
</style>
