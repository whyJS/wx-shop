// pages/category/category.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],//分类列表
    leftIndex:0,//选中一级分类index
    leftIndexSmall:0,//选中二级分类index

    // 商品列表
    goodsList:[],
    groupCode:'',
    pcode:'',
    pageNum:1,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.title){
      wx.setNavigationBarTitle({
        title: options.title,
      }) 
    }
    this.data.shopid = options.shopid
    this._api_all(options.shopid)
  },
  // 左侧点击
  onLeft(e){
    this.setData({
      leftIndex: e.currentTarget.dataset.index,
      leftIndexSmall:0
    })

    if (this.data.leftList[this.data.leftIndex].sublist.length>0){
      this._api_goods(this.data.shopid, this.data.leftList[this.data.leftIndex].code, this.data.leftList[this.data.leftIndex].sublist[0].code, 0)
    }else{
      this._api_goods(this.data.shopid, this.data.leftList[this.data.leftIndex].code, '', 0)
    }
    
  },
  onLeftB(e) {
    this.setData({
      leftIndexSmall: e.currentTarget.dataset.index
    })
    this._api_goods(this.data.shopid, this.data.leftList[this.data.leftIndex].code,e.currentTarget.dataset.code, 0)
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  // 一级分类
  _api_all(shopId){
    goodsModel.GetShopList({
      shopId
    }).then((res)=>{
      if (res.result == 200) {
        this.setData({
          leftList:res.data
        })
        if (this.data.leftList[0].sublist.length>0){
          this._api_goods(this.data.shopid,this.data.leftList[0].code, this.data.leftList[0].sublist[0].code, 0)
        }else{
          this._api_goods(this.data.shopid,this.data.leftList[0].code, '', 0)
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
  // 根据分类查商品Api
  _api_goods(category1, category2, category3,i){
    goodsModel.GetGoodsList2({
      category1,
      category2,
      category3,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }).then((res) => {
      console.log(res)
      if (res.result == 200) {
        if(i==0){
          this.setData({
            goodsList: res.data.content
          })
          
        }else{
          this.setData({
            goodsList: this.data.goodsList.concat(res.data.content)
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
