import request from '@/utils/request'

export const getNewsInfo = (params) =>
  request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
