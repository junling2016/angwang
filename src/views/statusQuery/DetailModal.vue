<template>
  <el-form class="form-detail">
    <el-form-item label="手机号码：">{{data.mdn}}</el-form-item>
    <el-form-item label="网关回执代码：">{{data.receipt}}</el-form-item>
    <el-form-item label="提交时间：">{{data.sendTime}}</el-form-item>
    <el-form-item label="到达时间：">{{data.receiveTime}}</el-form-item>
    <el-form-item label="是否被取状态：">{{data.status ? '是' : '否'}}</el-form-item>
    <el-form-item label="接入号：">{{data.code}}</el-form-item>
    <el-form-item label="运营商：">{{data.mdnType}}</el-form-item>
    <el-form-item label="号码归属地：">{{data.mdnBelong}}</el-form-item>
    <el-form-item label="发送内容：">{{data.content}}</el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style>
</style>
