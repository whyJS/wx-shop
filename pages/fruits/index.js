// pages/fruits/index.js
import { HomeModel } from '../../models/home.js'
const homeModel = new HomeModel()
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    fruits:[]
  },
  onLoad: function (options) {
    this._api_fruits()
  },
  onReachBottom: function () {

  },
  // 店铺点击
  onClick(e){
    wx.navigateTo({
      url: `/pages/category-shop/category?shopid=${e.currentTarget.dataset.shopid}&title=${e.currentTarget.dataset.shopname}`
    })
  },

  //果蔬食品接口
  _api_fruits() {
    homeModel.GetFruitsList({
      pageNum: 1,
      pageSize: 4
    }).then((res) => {
      console.log(res)
      if (res.result == 200) {
        this.setData({
          fruits: res.data.content
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