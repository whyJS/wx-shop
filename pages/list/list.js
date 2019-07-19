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
    this._api('')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      searchShow: false
    })
  },
  // 取消搜索
  onCancel(){
    this.setData({
      searchShow: false
    })
  },
  //搜索接口
  _api(searchText, category1){
    goodsModel.GetSearchList({
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      // searchText,
      // category1
    }).then((res) => {
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