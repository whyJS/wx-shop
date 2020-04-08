// pages/mine/mine.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._api_list()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 我的地址
  onAddress() {
    let token = wx.getStorageSync('_token')
    if (token.length < 1) {
      wx.navigateTo({
        url: '/pages/log/index',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/address-list/index?type=1',
    })
  },
  // 全部订单
  onOrder(e) {
    let token = wx.getStorageSync('_token')
    if (token.length < 1) {
      wx.navigateTo({
        url: '/pages/log/index',
      })
      return
    }
    console.log(e)
    wx.navigateTo({
      url: `/pages/order-list/index?index=${e.currentTarget.dataset.index}`,
    })
  },
  // 拨打电话
  onPhone(){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  // 购物车列表
  _api_list() {
    goodsModel.GetCarList().then((res) => {
      if (res.result == 200) {
        wx.setTabBarBadge({
          index: 1,
          text: `${res.data.num}`
        })

      }
    })
  }
})