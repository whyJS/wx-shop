// pages/category/category.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],//分类列表
    leftIndex: 0,//选中一级分类index
    leftIndexSmall: 0,//选中二级分类index

    // 商品列表
    goodsList: [],



    groupCode: '',
    pcode: '',
    pageNum: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.title) {
      // wx.setNavigationBarTitle({
      //   title: options.title
      // })
      this.data.pcode = 'shkj'
      this.data.groupCode = 'kj'
      this._api_all('shkj', 'kj')
    // }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function (options) {
    this._api_list()
  },
  // 左侧点击
  onLeft(e) {
    this.setData({
      leftIndex: e.currentTarget.dataset.index,
      leftIndexSmall: 0,
      pageNum: 1
    })
    this._api_all_two(this.data.leftList[e.currentTarget.dataset.index].code, this.data.groupCode, e.currentTarget.dataset.index)

  },
  onLeftB(e) {
    this.setData({
      leftIndexSmall: e.currentTarget.dataset.index,
      pageNum: 1
    })
    this._api_goods(this.data.pcode, this.data.leftList[this.data.leftIndex].code, e.currentTarget.dataset.code, 0)
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },

  //滚动到底部
  scrollBottom() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })


    this.data.pageNum++;
    console.log(this.data)
    if (this.data.leftList[this.data.leftIndex].list.length) {
      this._api_goods(this.data.pcode, this.data.leftList[this.data.leftIndex].code, this.data.leftList[this.data.leftIndex].list[this.data.leftIndexSmall].code, 1)
    } else {
      this._api_goods(this.data.pcode, this.data.leftList[this.data.leftIndex].code, '', 1)
    }

  },




  // 一级分类
  _api_all(pcode, groupCode) {
    goodsModel.GetClassList({
      pcode,
      groupCode
    }).then((res) => {
      console.log(res)
      if (res.result == 200) {
        let leftList = res.data;
        for (let i = 0; i < leftList.length; i++) {
          leftList[i].list = []
        }
        this.setData({
          leftList: leftList
        })

        this._api_all_two(leftList[0].code, groupCode, 0)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  // 添加二级分类方法
  _api_all_two(pcode, groupCode, index) {
    goodsModel.GetClassList({
      pcode,
      groupCode
    }).then((res) => {
      console.log(res)
      if (res.result == 200) {
        let leftList = this.data.leftList
        leftList[index].list = res.data
        console.log(index)
        console.log(leftList[index].list.length)
        if (leftList[index].list.length > 0) {
          this.setData({
            leftList: leftList
          })
          this._api_goods(this.data.pcode, leftList[index].code, leftList[index].list[0].code, 0)
        } else {
          this._api_goods(this.data.pcode, leftList[index].code, '', 0)
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
  _api_goods(category1, category2, category3, i) {
    goodsModel.GetGoodsList({
      category1,
      category2,
      category3,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }).then((res) => {
      wx.hideLoading();
      if (res.result == 200) {
        if (i == 0) {
          this.setData({
            goodsList: res.data.content
          })

        } else {
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
  },

  // 购物车列表
  _api_list() {
    goodsModel.GetCarList().then((res) => {
      if (res.result == 200) {
        wx.setTabBarBadge({
          index: 2,
          text: `${res.data.num}`
        })
      }


    })
  },

})
