// pages/address-list/index.js
import { AddressModel } from '../../models/address.js'
const addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._list()
  },

  // 新增地址
  onAddAddress(){
    wx.navigateTo({
      url: '/pages/address-add/index',
    })
  },


// 地址列表
  _list(){
    addressModel.GetAddressList().then((res)=>{
      console.log(res)
    })
  }
})