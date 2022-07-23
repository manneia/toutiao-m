<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" title="登录" fixed>
      <template #title>
        <van-button type="info" size="small" round icon="search" class="search-btn"> 搜索 </van-button>
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <div class="channel-tabs">
      <van-tabs v-model="active" animated swipeable duration="0.1" sticky offset-top="45">
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <article-list :channel="channel" />
        </van-tab>
        <template #nav-right>
          <div class="hamburger-btn" @click="showPopup">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </template>
        <!-- 文章列表 -->
      </van-tabs>
    </div>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
			:close-on-click-overlay="false"
      :style="{ height: '100%' }"
      @closed="close">
      <channel-edit
        ref="channelEdit"
        :myChannels="channels"
        :active="active"
        :allChannel="withoutUserChannels"
        @update-active="onUpdateActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getChannelListAPI } from '@/api'
import articleList from '@/views/home/component/article_list'
import channelEdit from '@/views/home/component/channel_edit'
import { mapState } from 'vuex'
import {getItem} from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [],
      show: false,
      allChannels: []
    }
  },
  components: {
    articleList,
    channelEdit
  },
  computed: {
    withoutUserChannels() {
      return this.allChannels.filter((item) => this.channels.findIndex((params) => params.id === item.id) === -1)
    },
    ...mapState(['token'])
  },
  created() {
    this.loadUserChannels()
    this.loadgetChannelList()
  },
  methods: {
    async loadUserChannels() {
      try {
        let channels = []
        if (this.token) {
          const { data } = await getUserChannelsAPI()
          channels = data.data.channels
        }else{
					const localChannels = getItem('TOUTIAO_CHANNELS')
					if(localChannels){
						channels = localChannels
					}else{
						const {data} = await getUserChannelsAPI()
						channels = data.data.channels
					}
				}
				this.channels = channels
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    async loadgetChannelList() {
      try {
        const { data } = await getChannelListAPI()
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },
    showPopup() {
      this.show = true
    },
    onUpdateActive(index, change) {
      this.active = index
      this.show = change
    },
    close() {
      this.$refs.channelEdit.isEdit = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  .search-btn {
    width: 6.9375rem;
    height: 0.8rem;
    background-color: #5babfb;
    border: none;
    font-size: 0.35rem;
    .van-icon {
      font-size: 0.4rem;
    }
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  /deep/.channel-tabs {
    .van-tabs_wrap {
      height: 1.025rem;
    }
    .van-tab {
      min-width: 2.5rem;
      font-size: 0.375rem;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      bottom: 0.1rem;
      width: 0.3875rem;
      height: 0.075rem;
      background-color: #3296fa;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.825rem;
      height: 1.025rem;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 0.4125rem;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 0.0125rem;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
