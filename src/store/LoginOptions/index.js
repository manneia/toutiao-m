import { getItem, setItem } from '@/utils/token.js'
export const LoginOptions = {
  namespaced: true,
  state: {
    token: getItem('token') || '', // 用户认证字符串
    refresh_token: getItem('refresh_token') || ''// 刷新token的字符串
  },
  mutations: {
    // 保存token到vuex中,并持久化
    SET_TOKEN (state, value) {
      state.token = value
      setItem('token', value)
    },
    // 保存refresh_token到vuex中,并持久化
    SET_REFRESH_TOKEN (state, value) {
      state.refresh_token = value
      setItem('refresh_token', value)
    }
  }
}
