import {
  HTTP
} from '../utils/http-p.js'

class HomeModel extends HTTP {
  constructor() {
    super()
  }
  // 获取首页轮播接口
  GetSwiperList(data) {
    return this.request({
      url: '/material/list/banner',
      method:"POST",
      data
    })
  }

  // 获取果蔬食品接口
  GetFruitsList(data) {
    console.log(data)
    return this.request({
      url: `/shop/list/shop?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    })
  }

  // 获取果蔬食品接口 首页
  GetFruitsListNew(data) {
    console.log(data)
    return this.request({
      url: `/shop/list/recommendShop?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    })
  }

  

}

export { HomeModel }