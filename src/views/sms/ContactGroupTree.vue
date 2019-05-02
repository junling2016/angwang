<template>
  <div>
    <el-row class="mb-10">
      <el-input v-model="filterVal" suffix-icon="el-icon-search" placeholder="输入手机号查询"></el-input>
    </el-row>
    <el-tree
      ref="tree"
      :data="groupData"
      node-key="id"
      show-checkbox
      check-on-click-node
      :expand-on-click-node="false"
    >
      <div class="custom-tree-node" slot-scope="{ data }">
        <i class="iconfont icon-group"></i>
        <span>{{ data.label }}</span>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { arrayToTree } from "@/utils/util";

export default {
  data() {
    return {
      // 查询关键字
      filterVal: ""
    };
  },

  computed: {
    contactGroups() {
      return this.$store.state.contactGroups || [];
    },

    groupData() {
      return arrayToTree(this.contactGroups);
    }
  },

  created() {
    // 请求通讯录群组树结构
    this.$store.dispatch("fetchContactGroups", true);
  }
};
</script>

<style>
</style>
