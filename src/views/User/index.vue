<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="userInfo header" v-if="token">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="UserInfo.photo" class="avatar" round />
          <span class="name">{{ UserInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ UserInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ UserInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ UserInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ UserInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <div>
      <van-grid class="grid-nav mb-9" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell v-if="token" class="logout-cell" clickable title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfoAPI } from '@/api'
import { removeItem } from '@/utils/token.js'
export default {
  name: 'UserPage',
  data () {
    return {
      UserInfo: {}
    }
  },
  computed: {
    ...mapState({ token: (state) => state.LoginOptions.token })
  },
  async created () {
    if (this.token) {
      const res = await getUserInfoAPI()
      this.UserInfo = res.data.data
    }
  },
  methods: {
    ...mapMutations({ SET_TOKEN: 'LoginOptions/SET_TOKEN', SET_REFRESH_TOKEN: 'LoginOptions/SET_REFRESH_TOKEN' }),
    // 退出登录的方法
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认退出登录吗?'
        })
        .then(() => {
          // on confirm 确认退出
          this.SET_TOKEN('')
          this.SET_REFRESH_TOKEN('')
          removeItem()
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .header {
    width: 750px;
    height: 401px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .userInfo {
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
          color: #fff;
        }
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
}
</style>
