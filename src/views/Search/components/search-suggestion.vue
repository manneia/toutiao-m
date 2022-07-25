<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in suggestions" :key="index" icon="search" @click="$emit('search', item)">
      <span slot="title" v-html="highlightText(item, searchText)"></span>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestionAPI } from '@/api'
export default {
  name: 'search-sugestions',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    // 监视输入框内容的变化
    searchText: {
      // 监视的处理函数
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const res = await getSearchSuggestionAPI(q)
        if (res.data.data.options[0] === null) {
          this.suggestions = []
        } else {
          this.suggestions = res.data.data.options
        }
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    highlightText(originStr, target) {
      // const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(target, 'gi')
      return originStr.replace(reg, (match) => {
        return `<span style="color: red">${match}</span>`
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
