// pages/order-created/index.js

import { OrderModel } from '../../models/order.js'
const orderModel = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    type:0,
    price:0,
    address:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods = wx.getStorageSync('_goods')
    let address =wx.getStorageSync('address')
    console.log(goods)
    console.log(address)
    if(goods){
      goods = JSON.parse(goods)
    }
    if (address){
      address = JSON.parse(address)
    }
    
    this.setData({
      goodsList: goods,
      type: options.type,
      price: options.price,
      address: address
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let goods = wx.getStorageSync('_goods')
    let address = wx.getStorageSync('address')
    if (goods) {
      goods = JSON.parse(goods)
    }
    if (address) {
      address = JSON.parse(address)
    }

    this.setData({
      goodsList: goods,
      address: address
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 跳转地址页面
  onAddress(){
    wx.navigateTo({
      url: '/pages/address-list/index'
    })
  },
  onOrder(){
    orderModel.SetGoodsOrder({
      cartList: this.cartList(),
      addressId:this.data.address.id,
      kuaidiPrice:0
    }).then((res) => {
      if (res.result == 200) {
        // wx.showToast({
        //   title: '订单创建成功',
        //   icon: 'none',
        //   duration: 2000
        // })
        wx.showModal({
          title: '提示',
          content: '未能成功支付，敬请期待',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

        // this._api_list()
        // wx.navigateTo({
        //   url: '/pages/order-list/index?index=0',
        // })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }


    })
  },
  cartList(){
    let arr = []
    this.data.goodsList.map((i)=>{
      let obj = {}
      obj.num = i.num
      obj.goodsId = i.goodsId
      
      arr.push(obj)
    })

    return JSON.stringify(arr)
  }
})