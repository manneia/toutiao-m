<template>
  <div class="article_list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      :success-duration="1000"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          :article="article"
          v-for="(article, index) in list"
          :key="index"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsInfoAPI } from '@/api'
import ArticleItem from '@/components/article-item'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      error: false,
      refreshing: false,
      refreshSuccessText: '刷新成功'
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getNewsInfoAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getNewsInfoAPI({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        this.list.unshift(...data.data.results)
        this.refreshSuccessText = '刷新成功'
        this.refreshing = false
      } catch (error) {
        this.refreshSuccessText = '刷新失败'
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped>
.article_list {
  height: 79vh;
  overflow: auto;
}
</style>
