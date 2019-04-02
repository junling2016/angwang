<template>
  <div>
    <h2 class="view-title">客户通讯录</h2>
    <el-card class="card-barrier" style="height: 660px;">
      <div class="card-sidebar">
        <div class="card-sidebar-header">
          <h4>通讯录群组</h4>
        </div>
        <div class="card-sidebar-body">
          <contact-group-tree @change="handleChange"></contact-group-tree>
        </div>
      </div>
      <div class="card-right">
        <contact-list :group-id="groupId"></contact-list>
      </div>
    </el-card>
  </div>
</template>

<script>
import ContactGroupTree from "./ContactGroupTree";
import ContactList from "./ContactList";
export default {
  name: "contacts",

  components: {
    ContactGroupTree,
    ContactList
  },

  data() {
    return {
      groupId: null
    };
  },

  created() {},

  methods: {
    handleChange(groupId) {
      this.groupId = groupId;
    }
  }
};
</script>

<style>
</style>
