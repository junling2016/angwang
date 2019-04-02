<template>
  <header class="header">
    <div class="header-brand">
      <div class="header-brand-inner">
        <router-link class="logo" to="/">
          <img src="../assets/images/logo.png">
          <!-- <span>昂网通信</span> -->
        </router-link>
      </div>
    </div>
    <div class="topbar-right clearfix">
      <el-popover
        ref="popover"
        popper-class="profile-popover"
        :visible-arrow="false"
        trigger="hover"
        placement="bottom-end"
      >
        <profile-drop></profile-drop>
      </el-popover>
      <div class="topbar-link profile right">
        <a class="profile-pic" v-popover:popover>
          <img src="../assets/images/profilepic.jpg" alt="头像">
          <span>angwang</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import ProfileDrop from "./ProfileDrop";
export default {
  components: {
    ProfileDrop
  }
};
</script>

<style>
</style>
