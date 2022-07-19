import ajax from 'axios'
import store from '@/store'
// 新建一个新的axios实例
const axios = ajax.create({
  baseURL: 'http://toutiao.itheima.net' // 基地址
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.LoginOptions.token.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = 'Bearer ' + store.state.LoginOptions.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => axios({
  url,
  method,
  params,
  data,
  headers
})
