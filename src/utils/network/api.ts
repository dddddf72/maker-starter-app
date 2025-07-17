import { Option, request, url } from './network';

/**
 * 登陆
 * @param email 邮箱
 * @param password 密码
 */
export const login = (email: string, password: string) => {
    return request(new Option(
        url.user.login, 
        {
          email: email,
          password: password
        }
      ))
}

/**
 * 注册
 * @param email 邮箱
 * @param password 密码
 * @param newpasswd 无效参数
 * @param verifyCode 验证码
 */
export const register = (
    email: string, 
    password: string, 
    newpasswd: string, 
    verifyCode: string
) => {
    return request(new Option(
        url.user.register, 
        {
          email: email,
          password: password,
          newpasswd: password,
          verifyCode: verifyCode
        }
    ))
}

/**
 * 发送验证码
 * @param email 邮箱
 */
export const sendEmailCode = (email: string) => {
    return request(new Option(
        url.user.sendEmailCode, 
        {
          email: email
        }
    ))
}

/**
 * 重置密码
 * @param email 邮箱
 * @param password 密码
 * @param verifyCode 验证码
 */
export const resetPwd = (
    email: string, 
    password: string, 
    verifyCode: string
) => {
  return request(new Option(
      url.user.resetPwd, 
      {
        email: email,
        password: password,
        verifyCode: verifyCode
      }
  ))
}