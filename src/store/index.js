import Vue from 'vue'
import Vuex from 'vuex'
import { fetchUserInfo, fetchContactGroups, fetchDepartments } from '@/api/api'

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
      state.userInfo = userInfo
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
     * 获取用户信息
     * @param {Context} param0
     */
    async fetchUserInfo({ commit }) {
      try {
        const { data } = await fetchUserInfo()
        commit('setUserInfo', data)
      } catch (err) {
        console.log(err)
      }
    },

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
