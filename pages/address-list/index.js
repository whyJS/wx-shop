// pages/address-list/index.js
import { AddressModel } from '../../models/address.js'
const addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    list:[1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.data.type = options.type
    }
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
  //编辑地址
  onUpdata(e){
    // let val = e.currentTarget.dataset.val
    let val = {
      aa:123
    }
    let index = e.currentTarget.dataset.val

    wx.navigateTo({
      url: `/pages/address-add/index?type=1&name=${val.aa}&phone=${val.aa}&add=${val.aa}`,
    })
  },
  //删除地址
  onDelete(e) {
    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
  },
  //设置默认地址
  onMoRen(e){
    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
  },
  // 点击地址
  onClick(e){
    if(this.data.type == 1){
      return
    }
    console.log(e.currentTarget.dataset)
    wx.setStorageSync('address', e.currentTarget.dataset)
  },


// 地址列表
  _list(){
    addressModel.GetAddressList().then((res)=>{
      // this.setData({
      //   list:res.data
      // })
    })
  }
})