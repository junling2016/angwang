<template>
  <div>
    <div class="profile-account clearfix">
      <a class="profile-pic left" v-popover:popover>
        <img src="../assets/images/profilepic.jpg" alt="头像">
      </a>
      <div class="left">
        <h3>angwang</h3>
        <p>昂网测试01</p>
      </div>
    </div>
    <ul class="popover-nav">
      <li>
        <router-link :to="{name: 'setting'}">
          <i class="iconfont icon-user"></i>
          <span>账号设置</span>
        </router-link>
      </li>
      <li>
        <a>
          <i class="iconfont icon-password"></i>
          <span>修改密码</span>
        </a>
      </li>
      <li>
        <a @click="handleLogout">
          <i class="iconfont icon-md-log-out"></i>
          <span>退出登录</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$confirm("确认退出平台？", "提示", {
        type: "info"
      })
        .then(() => {
          window.location.href = "/login.html";
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>
