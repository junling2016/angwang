<template>
  <el-tabs class="header-tabs" v-model="active" type="card" closable @tab-remove="removeTab">
    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      active: null
    };
  },

  methods: {
    setActive(name) {
      this.active = name;
    },

    removeTab(name) {
      this.$emit("tab-remove", name);
    }
  }
};
</script>

<style>
</style>
