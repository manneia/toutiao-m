<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条 - 登录" left-arrow @click-left="$router.back()" />
    <van-form ref="LoginForm" @submit="onSubmit">
      <van-field
        v-model.number="user.MobilePhone"
        name="MobilePhone"
        required
        label="手机号"
        type="number"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="UserFormRules.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model.number="user.sms"
        center
        clearable
        required
        name="sms"
        type="number"
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="UserFormRules.code"
        maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false" />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="mini"
            type="default"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button square block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { LoginAPI, getSmsCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        MobilePhone: '15735872902',
        sms: '246810'
      },
      UserFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误!' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    ...mapMutations({
      SET_TOKEN: 'LoginOptions/SET_TOKEN',
      SET_REFRESH_TOKEN: 'LoginOptions/SET_REFRESH_TOKEN'
    }),
    // 登录
    async onSubmit (values) {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      try {
        const res = await LoginAPI(values.MobilePhone, values.sms)
        // console.log(res)
        this.SET_TOKEN(res.data.data.token)
        this.SET_REFRESH_TOKEN(res.data.data.refresh_token)
        this.$toast.success('登录成功')
        // 跳转一定要写在最后-->尽量延迟跳转
        this.$router.push('layout/home')
      } catch (error) {
        console.dir(error)
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4. 根据请求响应结果处理后续操作
    },
    // 获取验证码
    async onSendSms () {
      try {
        await this.$refs.LoginForm.validate('MobilePhone')
      } catch (err) {
        return this.$toast.fail('手机号格式错误')
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await getSmsCodeAPI(this.user.MobilePhone)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else if (error.response.status === 404) {
          this.$toast('手机号错误')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  // .send-sms-btn {
  //   width: 152px;
  //   height: 46px;
  //   line-height: 46px;
  //   font-size: 22px;
  //   color: #666;
  // }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
