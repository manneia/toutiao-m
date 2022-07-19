import request from '@/utils/request.js'
/**
 * 用户相关接口
 */
// 获取用户个人资料
export const getUserInfo = () =>
  request({
    url: '/v1_0/user'
  })
