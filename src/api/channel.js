import request from '@/utils/request'

export const getUserChannels = () =>
  request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
export const getChannelList = () =>
  request({
    method: 'get',
    url: '/v1_0/channels'
  })
export const addUserChannel = (channels) =>
  request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: { channels: [channels] }
  })
export const deleteUserChannel = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
