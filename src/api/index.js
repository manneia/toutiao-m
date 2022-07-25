import { login, verifictonCode, getUserInfo } from '@/api/user'

import { getNewsInfo,getSearchSuggestion,getSearchResult } from '@/api/article'

import {
  getChannelList,
  getUserChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
// 登录----登录接口
export const loginAPI = login
// 登录----获取验证码
export const verifictonCodeAPI = verifictonCode
// 用户----获取用户基本信息
export const getUserInfoAPI = getUserInfo
// 文章----获取搜索建议
export const getSearchSuggestionAPI = getSearchSuggestion
// 文章----获取搜索结果
export const getSearchResultAPI = getSearchResult
// 文章----获取文章推荐
export const getNewsInfoAPI = getNewsInfo
// 频道----获取所有频道
export const getChannelListAPI = getChannelList
// 频道----新增用户频道
export const addUserChannelAPI = addUserChannel
// 频道----删除频道
export const deleteUserChannelAPI = deleteUserChannel
// 频道----获取用户频道
export const getUserChannelsAPI = getUserChannels