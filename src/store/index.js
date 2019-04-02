import Vue from 'vue'
import Vuex from 'vuex'
import { fetchContactGroups, fetchDepartments } from '@/api/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return {
      userInfo: null,
      contactGroups: null,
      departments: null
    }
  },

  mutations: {
    setUserInfo(state, userInfo) {
      state.cuserInfo = userInfo
    },

    setContactGroup(state, groups) {
      state.contactGroups = groups
    },

    setDepartments(state, departments) {
      state.departments = departments
    }
  },

  actions: {
    /**
     * 获取通讯录群组列表数据
     */
    async fetchContactGroups({ state, commit }, update) {
      if (state.contactGroups && !update) return
      try {
        const { data } = await fetchContactGroups()
        commit('setContactGroup', data)
      } catch (err) {
        console.log(err)
      }
    },

    /**
     * 请求部门列表
     */
    async fetchDepartments({ state, commit }, update) {
      if (state.departments && !update) return
      try {
        const { data } = await fetchDepartments()
        commit('setDepartments', data)
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default store
