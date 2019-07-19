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


}

export { UserModel }