<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载">
      <van-cell v-for="article in list" :key="article.art_id" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  name: 'search-result',
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      list: [],
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        const res = await getSearchResultAPI({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(res)
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('数据获取失败')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
