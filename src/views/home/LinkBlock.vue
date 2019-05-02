<template>
  <div class="link-block">
    <div class="link-block-icon">
      <i :class="icon"></i>
    </div>
    <div class="link-block-name">
      <router-link :to="to">{{title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    to: Object
  }
};
</script>

<style>
</style>
