/**
 * 相关接口的出口
 */
import { getSmsCode, Login } from '@/api/Login'
import {} from '@/api/Article'
import {} from '@/api/Channel'
import {} from '@/api/comment'
import {} from '@/api/Search'
import {} from '@/api/User'
/**
 * 登录接口
 */
// 登录---- 获取验证码
export const getSmsCodeAPI = getSmsCode
// 登录---- 登录
export const LoginAPI = Login
