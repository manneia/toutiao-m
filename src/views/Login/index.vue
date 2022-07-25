<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <i class="toutiao toutiao-zuojiantou" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon> <i class="toutiao toutiao-shouji"></i> </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i
        ></template>
        <template #button>
          <van-count-down
            v-if="isShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="mini"
            round
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, verifictonCodeAPI } from '@/api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17835115649',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isShow: false
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isShow = true
      try {
        await verifictonCodeAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
    async onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })
      try {
        const res = await loginAPI(this.user)
        this.$store.commit('setToken', res.data.data.token)
        this.$store.commit('setRefreshToken', res.data.data.refresh_token)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
        this.$toast.clear()
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
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
