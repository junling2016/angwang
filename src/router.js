import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Setting from './views/Setting'
import Sms from './views/Sms'
import ImmediateTasks from './views/ImmediateTasks'
import Reply from './views/Reply'
import DailyStatistics from './views/DailyStatistics'
import MonthlyStatistics from './views/MonthlyStatistics'
import StatusQuery from './views/statusQuery'
import Contacts from './views/contacts'
import BlackList from './views/blackList'
import Download from './views/Download'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        name: Home.name
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        title: '账号设置',
        name: Setting.name
      }
    },
    {
      path: '/sms',
      name: 'sms',
      component: Sms,
      meta: {
        title: '短信发送',
        name: Sms.name
      }
    },
    {
      path: '/immediateTasks',
      name: 'immediateTasks',
      component: ImmediateTasks,
      meta: {
        title: '即时任务列表',
        name: ImmediateTasks.name
      }
    },
    {
      path: '/reply',
      name: 'reply',
      component: Reply,
      meta: {
        title: '短信回复',
        name: Reply.name
      }
    },
    {
      path: '/dailyStatistics',
      name: 'dailyStatistics',
      component: DailyStatistics,
      meta: {
        title: '日发送统计',
        name: DailyStatistics.name
      }
    },
    {
      path: '/monthlyStatistics',
      name: 'monthlyStatistics',
      component: MonthlyStatistics,
      meta: {
        title: '月发送统计',
        name: MonthlyStatistics.name
      }
    },
    {
      path: '/statusQuery',
      name: 'statusQuery',
      component: StatusQuery,
      meta: {
        title: '状态查询',
        name: StatusQuery.name
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: {
        title: '客户通讯录',
        name: Contacts.name
      }
    },
    {
      path: '/blacklist',
      name: 'blacklist',
      component: BlackList,
      meta: {
        title: '黑名单管理',
        name: BlackList.name
      }
    },
    {
      path: '/download',
      name: 'download',
      component: Download,
      meta: {
        title: '下载中心',
        name: Download.name
      }
    }
  ]
})
