import {
  HTTP
} from '../utils/http-p.js'

class UserModel extends HTTP {
  constructor() {
    super()
  }
  // 获取验证码
  GetCode() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  // 验证码登陆
  UserLogin() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  // 微信登陆
  UserWxLogin(data) {
    return this.request({
      url: '/user/auth',
      method:"POST",
      data
    })
  }


}

export { UserModel }