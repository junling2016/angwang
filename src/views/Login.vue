<template>
  <div class="login">
    <header class="login-header">
      <div class="container-fluid">
        <div class="logo">
          <img src="../assets/images/logo-login.png" />
        </div>
        <div class="header-right">客服电话： 021-50388652</div>
      </div>
    </header>
    <div class="banner">
      <div class="container-fluid">
        <div class="login-box">
          <h1>登录</h1>
          <el-form :model="model" :rules="rules">
            <el-form-item>
              <el-input placeholder="企业ID" v-model="model.productId"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="用户名" v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="密码" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="验证码" v-model="model.verificationCode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="remember">记住账号密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="container-fluid login-columns">
      <el-row :gutter="200">
        <el-col class="column-box" :span="8" v-for="(column,index) in columns" :key="index">
          <img :src="column.icon" />
          <h3>{{column.title}}</h3>
          <p>{{column.content}}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import icon1 from '@/assets/images/icon-1.png'
import icon2 from '@/assets/images/icon-2.png'
import icon3 from '@/assets/images/icon-3.png'

export default {
  data() {
    return {
      model: {
        productId: '',
        username: '',
        password: '',
        verificationCode: ''
      },

      remember: false,

      rules: {
        productId: [],
        username: [],
        password: []
      },

      columns: [
        {
          icon: icon1,
          title: '更安全的体验',
          content:
            '提供企业级、多层级权限管理；敏感信息加密存储；支持跨区域数据同步和异地容灾机制'
        },
        {
          icon: icon2,
          title: '更好的支持',
          content:
            '提供可定制的模块化集成，规模可扩展，不影响服务；支持智能化全信息监控及7×24小时全天候运维服务'
        },
        {
          icon: icon3,
          title: '更快的服务',
          content:
            '提供快速的上线部署服务，高效率、智能化的信息传输控制，支持亿级别数据，秒间发送，信息即时可达'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.login-header {
  height: 60px;
  background: #fff;
  overflow: hidden;
  line-height: 60px;
  .logo {
    float: left;
  }
}

.header-right {
  float: right;
}

.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.banner {
  height: 500px;
  background: url('../assets/images/banner.png') 20% bottom no-repeat #429ae1;
}

.login-box {
  float: right;
  width: 300px;
  background: #fff;
  margin-top: 30px;
  padding: 20px;
  h1 {
    text-align: center;
    color: #60adff;
    font-weight: normal;
    margin-bottom: 20px;
  }

  .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
}

.login-btn {
  width: 100%;
  padding: 13px 15px !important;
}

.login-columns {
  margin: 50px auto;
}

.column-box {
  text-align: center;
  h3 {
    margin: 20px 0;
    font-weight: normal;
  }
  p {
    color: #999;
    text-align: left;
  }
}
</style>
