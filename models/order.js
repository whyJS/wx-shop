import {
  HTTP
} from '../utils/http-p.js'

class OrderModel extends HTTP {
  constructor() {
    super()
  }
  // 获取订单列表
  GetOrderList(data) {
    return this.request({
      url: '/order/list',
      method:"POST",
      data
    })
  }

  // 获取订单详情
  GetOrderDetail(data) {
    return this.request({
      url: `/order/detail`,
      method:"POST",
      data
    })
  }

  // 创建订单
  SetGoodsOrder(data) {
    return this.request({
      url: `/cart/settlement`,
      method:'POST',
      data
    })
  }

  


}

export { OrderModel }