<template>
  <div class="channel-edit">
    <van-cell title="我的频道" size="large" :border="false">
      <template #default>
        <van-button class="edit-btn" round type="danger" size="mini" plain @click="isEdit = !isEdit">
          {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(index)">
        <template #icon>
          <van-icon
            name="clear"
            v-show="isEdit && !fixChannel.includes(channel.id)"
            @click="deleteTag(index, channel)"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: index === active }"> {{ channel.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="item in allChannel"
        :key="item.id"
        :text="item.name"
        @click="addTag(item)">
        <template #icon>
          <van-icon name="plus" v-if="isEdit"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
import { addUserChannelAPI, deleteUserChannelAPI } from '@/api'
export default {
  data () {
    return {
      isEdit: false,
      fixChannel: [0]
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    allChannel: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    onMyChannelClick (index) {
      if (!this.isEdit) {
        this.$emit('update-active', index)
      }
    },
    async deleteTag (index, channel) {
      if (index < this.active || (index === this.myChannels.length - 1 && index === this.active)) {
        this.$emit('update-active', this.active - 1, true)
      }
      if (this.isEdit) {
        this.myChannels.splice(index, 1)
      }
      try {
        if (this.token) {
          await deleteUserChannelAPI(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(error)
        this.$toast('')
      }
    },
    async addTag (val) {
      if (this.isEdit) {
        this.myChannels.push(val)
      }

      try {
        if (this.token) {
          await addUserChannelAPI({
            id: val.id,
            seq: this.myChannels.length
          })
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .channel-item {
    width: 160px;
    height: 86px;
    /deep/ .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .my-grid {
    .van-icon {
      position: absolute;
      top: -37px;
      right: -90px;
      font-size: 36px;
      color: #cacaca;
      z-index: 2;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
        margin-right: 8px;
        line-height: 86px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
</style>
