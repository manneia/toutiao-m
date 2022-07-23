import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('token') || '',
    refresh_token: getItem('refresh_token') || ''
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      setItem('token', data)
    },
    setRefreshToken (state, data) {
      state.refresh_token = data
      setItem('refresh_token', data)
    }
  },
  actions: {},
  modules: {}
})
