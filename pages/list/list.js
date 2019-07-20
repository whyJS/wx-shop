// pages/list/list.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()

Page({
  data: {
    searchCode:'',
    searchShow:false,
    pageNum:1,
    pageSize:10
  },
  onLoad: function (options) {
    this._api(0, this.data.searchCode)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    this.data.pageNum = this.data.pageNum + 1
    this._api(1, this.data.searchCode)
  },
  // 点击搜索
  onSearch(){
    this.setData({
      searchShow: true
    })
  },
  // 搜索值
  onConfirm(e){
    this.setData({
      searchCode:e.detail.value,
      searchShow: false,
      pageNum:1,
      list:[]
    })
    this._api(0,this.data.searchCode)
  },
  // 取消搜索
  onCancel(){
    this.setData({
      searchShow: false
    })
  },
  //搜索接口
  _api(i,search, category1){
    goodsModel.GetSearchList({
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      search,
      // category1
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
  }
})