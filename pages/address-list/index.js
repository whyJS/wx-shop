// pages/address-list/index.js
import { AddressModel } from '../../models/address.js'
const addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    list:[]
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
      url: '/pages/address-add/index?type=0',
    })
  },
  //编辑地址
  onUpdata(e){
   
    let val = {
      name: e.currentTarget.dataset.val.consignee,
      phone: e.currentTarget.dataset.val.phone,
      address: e.currentTarget.dataset.val.address,
      id: e.currentTarget.dataset.val.id
    }
    let index = e.currentTarget.dataset.val

    wx.navigateTo({
      url: `/pages/address-add/index?type=1&name=${val.name}&phone=${val.phone}&address=${val.address}&id=${val.id}`,
    })
  },
  //删除地址
  onDelete(e) {
    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index

    addressModel.GetDeleteAddress({
      id: val.id
    }).then((res) => {
      if (res.result == 200) {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })

        this._list()

      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  //设置默认地址
  onMoRen(e){
    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
    
    addressModel.GetDefaultAddress({
      id: val.id
    }).then((res) => {
      if (res.result == 200) {
        wx.showToast({
          title: '设置成功',
          icon: 'none',
          duration: 2000
        })

        this._list()

      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  // 点击地址
  onClick(e){
    if(this.data.type == 1){
      return
    }
    console.log(e.currentTarget.dataset)
    wx.setStorageSync('address', JSON.stringify(e.currentTarget.dataset.val))

    wx.navigateBack()
  },


// 地址列表
  _list(){
    addressModel.GetAddressList().then((res)=>{
      if (res.result == 200) {
        this.setData({
        list:res.data
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