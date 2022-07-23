import { login, verifictonCode, getUserInfo } from '@/api/user'

import { getNewsInfo } from '@/api/article'

import {
  getChannelList,
  getUserChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'

export const loginAPI = login
export const verifictonCodeAPI = verifictonCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getNewsInfoAPI = getNewsInfo
export const getChannelListAPI = getChannelList
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel
