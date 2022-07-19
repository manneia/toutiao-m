/**
 * 登录相关接口
 * @params mobile
 * @params SmsCode
 * @return SmsCode/(refresh_token,token)
 */
import request from '@/utils/request.js'
// 登录 ---- 获取验证码  注意:每分钟发送一次
export const getSmsCode = (mobile) => request({
  url: `/v1_0/sms/codes/${mobile}`
})
// 登录 ---- 登录
export const Login = (userMobile, SmsCode) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile: userMobile,
    code: SmsCode
  }
})
