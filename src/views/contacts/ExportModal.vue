<template>
  <div>
    <el-alert
      title="因导出通讯录全部号码会影响系统性能，所以每次最多只能导出1万个号码，如需更多请联系客服处理"
      :closable="false"
      style="margin-bottom:20px;"
    ></el-alert>
    <el-form label-width="90px">
      <el-form-item label="所属群组：">
        <el-select v-model="model.groupId" filterable>
          <el-option v-for="{id,label} in contactGroups" :key="id" :label="label" :value="id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 导出组件，action为导出接口，params为导出所需参数 -->
    <aw-export ref="export" action="/exportContacts" :params="model"></aw-export>
  </div>
</template>

<script>
import AwExport from "@/components/AwExport";

export default {
  components: {
    AwExport
  },

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
      this.$refs.export.submit();
      this.$emit("submitted");
    }
  }
};
</script>

<style>
</style>
