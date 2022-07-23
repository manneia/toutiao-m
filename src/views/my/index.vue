<template>
  <div class="my-container">
    <div class="userInfo wrap" v-if="token">
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>

          <span>获赞</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="grid-nav">
      <van-grid clickable :column-num="2">
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
          <template #text>
            <span class="text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
          <template #text>
            <span class="text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link to="" />
    <van-cell title="小智同学" is-link to="" />
    <van-cell
      clickable
      @click="onLogout"
      v-if="token"
      class="logout-cell"
      title="退出登录"
      center
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.token) {
      this.onLoadUserInfo()
    }
  },
  computed: {
    ...mapState(['token'])
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认退出吗?'
        })
        .then(() => {
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },
    async onLoadUserInfo () {
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
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
        color: rgb(255, 255, 255);
      }
    }
  }

  .wrap {
    width: 750px;
    height: 401px;
    background: url("~@/assets/banner.png");
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
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
          color: #fff;
        }
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
  .grid-nav {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    i.toutiao-shoucang {
      color: #eb5253;
    }
    i.toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
