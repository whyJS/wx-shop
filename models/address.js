import {
  HTTP
} from '../utils/http-p.js'

class AddressModel extends HTTP {
  constructor() {
    super()
  }
  // 地址列表
  GetAddressList(data) {
    return this.request({
      url: '/user/address/list',
      method:'POST'
    })
  }

  // 新增收获地址
  GetAddAddress(data) {
    return this.request({
      url: '/user/address/save',
      method: 'POST',
      data
    })
  }

  // 编辑收获地址
  GetUpdataAddress(data) {
    return this.request({
      url: '/user/address/update',
      data
    })
  }

  // 删除收获地址
  GetDeleteAddress(data) {
    return this.request({
      url: '/user/address/delete',
      method: 'POST',
      data
    })
  }



}

export { AddressModel }