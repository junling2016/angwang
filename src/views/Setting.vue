<template>
  <el-card class="view-setting" header="账号设置">
    <div style="margin-left:50px;">
      <el-form class="form-details" label-width="100px" label-position="left">
        <el-form-item label="账号名称：">angwang</el-form-item>
        <el-form-item label="企业ID：">1458</el-form-item>
        <el-form-item label="企业名称：">昂网测试01</el-form-item>
        <el-form-item label="绑定IP地址：">10.0.169.1</el-form-item>
        <el-form-item label="联系人：">
          <span>未设置</span>
          <el-button type="text" style="margin-left:20px;">设置</el-button>
        </el-form-item>
        <el-form-item label="联系电话：">
          <span>未设置</span>
          <el-button type="text" style="margin-left:20px;">设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "setting"
};
</script>

<style>
</style>
