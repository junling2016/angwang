<template>
  <div id="app">
    <header-bar></header-bar>
    <menu-bar></menu-bar>
    <el-tabs
      class="header-tabs"
      v-model="active"
      type="card"
      :closable="tabs.length > 1"
      @tab-remove="removeTab"
      @tab-click="handleTabChange"
    >
      <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
    </el-tabs>
    <div class="view-container">
      <keep-alive :include="keepAlives">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import MenuBar from "@/components/MenuBar";
export default {
  components: {
    HeaderBar,
    MenuBar
  },

  data() {
    return {
      tabs: [],
      keepAliveTabs: [],
      active: null
    };
  },

  computed: {
    keepAlives() {
      return this.tabs.map(tab => tab.viewName);
    }
  },

  watch: {
    $route: "updateTabs"
  },

  created() {
    this.updateTabs();
  },

  methods: {
    updateTabs() {
      const { path, meta } = this.$route;
      const tab = this.tabs.find(tab => tab.name === path);

      if (!tab) {
        this.tabs.push({
          name: path,
          title: meta.title,
          viewName: meta.name
        });
      }

      this.active = path;
    },

    handleTabChange() {
      this.$router.push({
        path: this.active
      });
    },

    /**
     * 删除tab
     * @param name 将要删除的tab标识
     */
    removeTab(name) {
      const index = this.tabs.findIndex(tab => tab.name === name);
      const nextIndex = index < this.tabs.length - 1 ? index + 1 : index - 1;
      this.$router.replace({
        path: this.tabs[nextIndex].name
      });
      this.tabs = this.tabs.filter(tab => tab.name !== name);
    }
  }
};
</script>
