// pages/goodsdetail/index.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    goods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this._api_goods(options.id)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 立即购买
  onOrder(){
    wx.navigateTo({
      url: '/pages/order-created/index'
    })
  },
  // 跳转创建订单页面
  onFruits(){
    wx.navigateTo({
      url: '/pages/order-created/index'
    })
  },


  //添加购物车
  onShopCar() {
    goodsModel.SetAddCar({
      goodsId: this.data.goods.goodsId,
      num: 1
    }).then((res) => {
      if (res.result == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 跳转到购物车
  onCar(){
    wx.switchTab({
      url:'/pages/shopcar/shopcar'
    })
  },

  // 跳转到店铺
  onShop(){
    wx.navigateTo({
      url: `/pages/category-shop/category?shopid=${goods.shopId}&title=${goods.shopName}`
    })
  },

  // 商品详情
  _api_goods(id){
    goodsModel.GetGoodsDetailList({
      id
    }).then((res) => {
      
      if (res.result == 200) {
       this.setData({
         goods:res.data
       })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})