// pages/fruits/index.js
import { HomeModel } from '../../models/home.js'
const homeModel = new HomeModel()
Page({
  data: {
    imgUrls: [
      'https://tyigou.haoshichengduo.com/index_guoshu.png'
    ],
    fruits:[]
  },
  onLoad: function (options) {
    this._api_fruits()
  },
  onReachBottom: function () {

  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
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
      pageSize: 100
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