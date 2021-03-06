// pages/order-list/index.js
import { OrderModel } from '../../models/order.js'
const orderModel = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: ['全部', '待付款', '待收货','已完成'],
    topListIndex:0,//顶部id
    pageNum:1,
    pageSize:10,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.topListIndex = options.index
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      topListIndex: this.data.topListIndex
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._api_list(0)
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
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    this.data.pageNum = this.data.pageNum+1
    this._api_list(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTopClick(e){
    this.setData({
      topListIndex:e.target.dataset.index,
      pageNum:1,
      list:[]
    })
  
    this._api_list(0)
  },
  onOrderDetail(e){
    let val = e.currentTarget.dataset.val
    console.log(e)
    wx.navigateTo({
      url: `/pages/order-detail/index?id=${val.orderId}&status=${val.status}`,
    })
  },

  _api_list(i){
    orderModel.GetOrderList({
      status: this._status(),
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }).then((res) => {
      wx.hideLoading();
      if (res.result == 200) {
        if (i == 0) {
          this.setData({
            list: res.data.content
          })

        } else {
          this.setData({
            list: this.data.list.concat(res.data.content)
          })
        }
        
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }


    })
  },
  // 订单状态
  _status(){
    if (this.data.topListIndex == 0){
      return -999
    } else if(this.data.topListIndex == 1) {
      return 0
    } else if (this.data.topListIndex == 2) {
      return 1
    } else if (this.data.topListIndex == 3) {
      return 10
    }
  },
  //支付e
  payOrder(e){
    // console.log('asasas')
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
    // return
    let res = e.currentTarget.dataset.val
console.log(res)
    orderModel.payGoodsOrder({
      orderId: res.orderId
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