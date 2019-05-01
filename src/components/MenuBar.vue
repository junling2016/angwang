<template>
  <nav class="navbar">
    <el-menu unique-opened router :default-active="$route.path">
      <template v-for="menuItem in menu">
        <el-submenu
          v-if="menuItem.children && menuItem.children.length"
          :key="menuItem.index"
          :index="menuItem.index"
        >
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span>{{menuItem.title}}</span>
          </template>

          <el-menu-item
            v-for="subMenuItem in menuItem.children"
            :key="subMenuItem.index"
            :index="subMenuItem.index"
          >{{subMenuItem.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="menuItem.index" :index="menuItem.index">
          <i :class="menuItem.icon"></i>
          <span slot="title">{{menuItem.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "首页",
          index: "/",
          icon: "iconfont icon-home"
        },
        {
          title: "信息发送",
          icon: "iconfont icon-sms",
          index: "/sms",
          children: [
            {
              title: "短信发送",
              index: "/sms"
            },
            {
              title: "即时任务列表",
              index: "/immediateTasks"
            },
            {
              title: "预约任务列表",
              index: "/appointmentTasks"
            },
            {
              title: "动态短信",
              index: "/dynamicSms"
            },
            {
              title: "常用短语",
              index: "/template"
            }
          ]
        },
        {
          title: "短信回复",
          index: "/smsReply",
          icon: "iconfont icon-messagereplytext"
        },
        {
          title: "发送统计",
          index: "/statistics",
          icon: "iconfont icon-et-sales-statistics",
          children: [
            {
              title: "日发送统计",
              index: "/dailyStatistics"
            },
            {
              title: "月发送统计",
              index: "/monthlyStatistics"
            },
            {
              title: "状态查询",
              index: "/statusQuery"
            }
          ]
        },
        {
          title: "通讯录",
          index: "/contacts",
          icon: "iconfont icon-addressbook2",
          children: [
            {
              title: "客户通讯录",
              index: "/contacts"
            },
            {
              title: "黑名单管理",
              index: "/blacklist"
            }
          ]
        },
        {
          title: "下载中心",
          index: "/download",
          icon: "iconfont icon-download"
        }
      ]
    };
  }
};
</script>

<style>
</style>
