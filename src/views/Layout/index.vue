<template>
  <div class="layout-container">
    <!-- 二级路由挂载点 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <div>
      <van-tabbar v-model="active" class="layout-tabbar" route>
        <van-tabbar-item icon="home-o" replace to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item to="/layout/wenda" replace>
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/video" replace>
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/layout/user" replace>
          {{ $store.state.LoginOptions.token ? '我的' : '未登录' }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
