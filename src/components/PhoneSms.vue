<template>
  <div class="phone-box">
    <img src="../assets/images/phone.png">
    <div class="content-warpper" v-show="value">
      <div class="content">{{value}}</div>
      <!-- 短信容器箭头 -->
      <svg
        width="20"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M 10 15 C 10 20 14 30 20 30 C 20 30 0 30 0 15 Z"
          stroke-linecap="square"
          stroke-width="1"
          stroke="none"
          fill="#00cb47"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
};
</script>

<style>
</style>
