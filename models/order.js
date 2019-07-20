import {
  HTTP
} from '../utils/http-p.js'

class OrderModel extends HTTP {
  constructor() {
    super()
  }
  // 获取订单列表
  GetOrderList() {
    return this.request({
      url: '/order/list'
    })
  }

  // 获取订单详情
  GetOrderDetail() {
    return this.request({
      url: `/order/detail`
    })
  }


}

export { OrderModel }