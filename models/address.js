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
      url: '/user/address/list'
    })
  }

  // 新增收获地址
  GetAddAddress(data) {
    // url: `/user/address/save?provinceCode=${data.provinceCode}&cityCode=${data.cityCode}&countyCode=${data.countyCode}&address=${data.address}&phone=${data.phone}&consignee=${data.consignee}`,
    return this.request({
      url: `/user/address/save`,
      method:'POST',
      data
    })
    // return this.request({
    //   url: '/user/address/save',
    //   method: 'POST',
    //   data
    // })
  }

  // 编辑收获地址
  GetUpdataAddress(data) {
    return this.request({
      url: '/user/address/update',
      method: 'POST',
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
  // 设置默认地址地址
  GetDefaultAddress(data) {
    return this.request({
      url: '/user/address/default',
      method: 'POST',
      data
    })
  }




}

export { AddressModel }