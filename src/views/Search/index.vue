<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form class="search-form" action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        @focus="isResultShow = false"
        @cancel="onCancel" />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion @search="onSearch" :searchText="searchText" v-else-if="searchText"></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory v-else :SearchHistories="SearchHistories"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistories: [] // 搜索历史记录
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 不要有重复历史记录
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  components: { SearchHistory, SearchSuggestion, SearchResult }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
