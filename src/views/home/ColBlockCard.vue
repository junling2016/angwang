<template>
  <el-card class="col-block">
    <el-row>
      <div :class="`col-block-icon bg-${color}`">
        <i :class="icon"></i>
      </div>
      <div class="col-block-right">
        <p>{{title}}</p>
        <p>
          <strong class="text-link">{{count}}</strong> 条
        </p>
      </div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    color: String,
    icon: String,
    title: String,
    count: Number
  }
};
</script>

<style>
</style>
