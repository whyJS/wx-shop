// pages/index/index.js
import { baidu_key } from '../../config.js'
import { HomeModel } from '../../models/home.js'
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()
const homeModel = new HomeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstOne:false,
    imgUrls: [],//首页轮播
    city:'正在定位',
    //倒计时
    index_timer:null,
    index_time_number:100000,
    h:'00',
    m:'00',
    s:'00',

    page:1,

    // 果蔬食品
    fruits:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: '3'
    // })
    console.log(options)
    console.log('asasa')
    this._local_address();
    this.index_timer = setInterval(()=>{
      this._time(this.data.index_time_number);
      this.data.index_time_number = this.data.index_time_number-1
      if (this.data.index_time_number<0){
        this.setData({
          h:"00",
          m:"00",
          s:"00"
        })
        clearInterval(this.index_timer)
      }
    },1000)
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // if (this.data.firstOne) {
    //   this.onLoad()   
    // }else{
    //   this.data.firstOne = true
    // }
    this._api_banner()
    this._api_fruits()
    this._api_list()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    setTimeout(()=>{
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
    },2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    return
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    this.data.page++;
    setTimeout(()=>{
      // 隐藏加载框  
      wx.hideLoading();
    },2000)
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 
   * 获取地址
   */
  getLocationDetail: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.getCity(latitude, longitude);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getCity: function (latitude, longitude) {
    var that = this;
    var url = baidu_key.url;
    var params = {
      ak: baidu_key.ak,//免费去百度地图上申请一个
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res)
        if (res.data.status == 0) {
          wx.setStorageSync('_address', res.data.result )
          that.setData({
            city: res.data.result.addressComponent.city
          })
        } else {
          that.setData({
            city: '定位失败'
          })
        }

      },
    })
  },
  /**
   * 关闭筛选框
   */
  onClose() {
    this.setData({
      showScreen: false
    })
  },

  /**
   * 跳转搜索页面
   */
  onSearch(){
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },

  /**
   * 获取地址
   */
  onLocationHave(){
    this.setData({
      city:'正在定位...'
    })
    this.getLocationDetail();
  },

  onImgClick(){
    console.log('点击轮播图')
  },
  // 果蔬
  onFruits(e){
    wx.navigateTo({
      url: `/pages/category-shop/category?shopid=${e.currentTarget.dataset.shopid}&title=${e.currentTarget.dataset.shopname}`
    })
  },
  onFruitsAll(e){
    wx.navigateTo({
      url: `/pages/fruits/index`
    })
  },


  // 时间倒计时
  _time(result){
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    this.setData({
      h,
      m,
      s
    })
  },

  /**
   * 判断有无地址
   */
  _local_address(){
    let address = wx.getStorageSync('_address');
    if (address) {
      this.setData({
        city: address.addressComponent.city
      })
    } else {
      this.getLocationDetail();
    }   
  },


// 首页banner接口
  _api_banner(){
    homeModel.GetSwiperList().then((res)=>{
      console.log(res)
      if(res.result==200){
        this.setData({
          imgUrls: res.data
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }

      console.log(this.data.imgUrls)
      
    })
  },

  //果蔬食品接口
  _api_fruits() {
    homeModel.GetFruitsList({
      pageNum:1,
      pageSize:4
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