import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Setting from './views/Setting'
import Sms from './views/Sms'
import ImmediateTasks from './views/ImmediateTasks'
import Contacts from './views/contacts'

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
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: {
        title: '客户通讯录',
        name: Contacts.name
      }
    }
  ]
})
