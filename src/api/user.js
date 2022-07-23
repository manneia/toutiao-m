import request from '@/utils/request'

export const login = (data) =>
  request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
export const verifictonCode = (params) =>
  request({
    method: 'get',
    url: `/v1_0/sms/codes/${params}`
  })
export const getUserInfo = () =>
  request({
    method: 'get',
    url: '/v1_0/user'
  })
