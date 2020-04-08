// pages/order-created/index.js
import { OrderModel } from '../../models/order.js'
const orderModel = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    status:'',
    order:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.data.status = options.status
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      id: this.data.id,
      status: this.data.status
    })
    this._api()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  _api() {
    orderModel.GetOrderDetail({
      orderId:this.data.id
    }).then((res) => {
      if (res.result == 200) {
        this.setData({
          order:res.data
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

  //微信支付
  onOrder(){
    // wx.showModal({
    //   title: '提示',
    //   content: '支付尚未开通，敬请期待',
    //   success(res) {
    //     if (res.confirm) {

    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    orderModel.payGoodsOrder({
      orderId: this.data.id
    }).then((r) => {
      console.log(r)
      wx.requestPayment(
        {
          'timeStamp': r.data.timeStamp,
          'nonceStr': r.data.nonceStr,
          'package': r.data.prepayPackage,
          'signType': 'MD5',
          'paySign': r.data.paySign,
          'success': function (ee) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
            // wx.showModal({
            //   title: '提示',
            //   content: '支付成功',
            //   success(res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: `/pages/pay-success/index`
            //       })
            //     } else if (res.cancel) {
            //       console.log('用户点击取消')
            //     }
            //   }
            // })

          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '您已取消支付',
                icon: 'none',
                duration: 3000
              });

            } else {
              console.log('res.errMsg');
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 3000
              });

            }
          },
          'complete': function (res) {
            console.log(res)
            console.log('结束')
          }
        })
    })
  }
})