import request from '@/utils/request'

export const getNewsInfo = (params) => request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
export const getSearchSuggestion = q => request({
	url:'/v1_0/suggestion',
	params:{
		q
	}
})
export const getSearchResult = (params) => request({
	url:'/v1_0/search',
	params
})