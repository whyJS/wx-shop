// pages/shopcar/shopcar.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()
Page({
  data: {
    totalPrice:0,//总价
    showDelete:false,
    text:"编辑",
    list:[],
    all:true
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this._api_list()
  },
  onAll(){
    if (this.data.showDelete){
      return
    }

    let list = this.data.list
    for (let i = 0; i < list.length; i++) {
      list[i].show = true
    }
    this.setData({
      list
    })
    this._all()
  },
  //添加商品
  onAdd(e){
    if (this.data.showDelete) {
      return
    }

    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    val.num = val.num+1
    list[index] = val
    goodsModel.SetUpdateCar({
      goodsId: val.goodsId,
      num:val.num
    }).then((res) => {
      if (res.result == 200) {
       this.setData({
         list:list
       })
        this._all()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
      })

    
  },
  //减少商品数量
  onDelete(e){
    if (this.data.showDelete) {
      return
    }

    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    if(val.num <= 1){
      return
    }
    val.num = val.num -1
    list[index] = val
    goodsModel.SetUpdateCar({
      goodsId: val.goodsId,
      num: val.num
    }).then((res) => {
      if (res.result == 200) {
        this.setData({
          list: list
        })
        this._all()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onShowDelete(){
    if(this.data.showDelete){
      this.setData({
        text:"编辑",
        showDelete:false
      })
    }else{
      this.setData({
        text: "完成",
        showDelete: true
      })

      let list = this.data.list
      for (let i = 0; i < list.length; i++) {
        list[i].show = true
      }
      this.setData({
        list
      })

      this._all()
    }


  },

  // 点击选中，或者补选中
  onBtnShow(e){
    if (this.data.showDelete) {
      return
    }

    let val = e.currentTarget.dataset.val
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    val.show = !val.show
    list[index] = val
    this.setData({
      list:list
    })

    this._all()
  },

  // 去结算
  onJieSuan(){
    let token = wx.getStorageSync('_token')
    if (token.length<1){
      wx.navigateTo({
        url: '/pages/log/index',
      })
      return
    }
   


    let arr = []
    this.data.list.map((i)=>{
      if(i.show){
        arr.push(i)
      }
    })

    wx.setStorageSync('_goods', JSON.stringify(arr))
    wx.navigateTo({
      url: `/pages/order-created/index?type=1&price=${this.data.totalPrice}`
    })

  },
  // 去结算
  onClear() {
    goodsModel.SetClearCar().then((res) => {
      if (res.result == 200) {
        wx.showToast({
          title: '清除成功',
          icon: 'none',
          duration: 2000
        })
        this._api_list()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }


    })
  },

  // 购物车列表
  _api_list(){
    goodsModel.GetCarList().then((res)=>{
      if (res.result == 200) {
        wx.setTabBarBadge({
          index: 1,
          text: `${res.data.num}`
        })
        if (res.data.goodsList == null){
          res.data.goodsList = []
        }
        for (let i = 0; i < res.data.goodsList.length; i++) {
          res.data.goodsList[i].show = true
          res.data.goodsList[i].deleteShow = false
        }
        this.setData({
          list: res.data.goodsList,
          totalPrice: res.data.totalPrice
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

  // 判断是否全选
  _all(){
    let show = true
    let totalPrice = 0
    this.data.list.map((i)=>{
      if(!i.show){
        show = false
      }else{
        totalPrice = totalPrice+i.realPrice*i.num 
      }
    })
    this.setData({
      all:show,
      totalPrice
    })

    console.log(this.data.all)
  }
})