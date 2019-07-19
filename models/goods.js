import {
  HTTP
} from '../utils/http-p.js'

class GoodsModel extends HTTP {
  constructor() {
    super()
  }
  // 分类查询
  GetClassList(data) {
    return this.request({
      url: `/goods/list/space_category?pcode=${data.pcode}&groupCode=${data.groupCode}`,
    })
  }

  // 根据分类查商品
  GetGoodsList(data) {
    let url = `/goods/list/space_goods?category1=${data.category1}&category2=${data.category2}&category3=${data.category3}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`
    if (data.category3==''){
      url = `/goods/list/space_goods?category1=${data.category1}&category2=${data.category2}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`
    }
    return this.request({
      url
    })
  }
  // 根据分类查商品加店铺id
  GetGoodsList2(data) {
    let url = `/goods/list/shop_goods?shopId=shkj&category2=${data.category2}&category3=${data.category3}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`
    if (data.category3 == '') {
      url = `/goods/list/shop_goods?shopId=shkj&category2=${data.category2}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`
    }
    return this.request({
      url
    })
  }

  // 根据店铺id查分类
  GetShopList(data){
    return this.request({
      url: `/shop/list/shopcategory?shopId=${data.shopId}`,
    })
  }

  // 商品详情
  GetGoodsDetailList(data) {
    return this.request({
      url: `/goods/detail?id=${data.id}`,
    })
  }


  // 购物车列表
  GetCarList(data) {
    return this.request({
      url: `/cart/list`,
    })
  }
  // 加入购物车
  SetAddCar(){
    return this.request({
      url: `/cart/add`,
    })
  }

  // 清空购物车
  SetClearCar() {
    return this.request({
      url: `/cart/clearAll`,
    })
  }

  // 修改购物车内商品数量
  SetUpdateCar() {
    return this.request({
      url: `/cart/update`,
    })
  }

  // 购物车结算
  SetSettlementCar() {
    return this.request({
      url: `/cart/settlement`,
    })
  }

}

export { GoodsModel }