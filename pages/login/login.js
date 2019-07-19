// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:null,
    text:'获取验证码',
    time:60,
    phone:'',
    code:'',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 获取验证码
  onCode(){
    console.log('asas')
    if (this.data.text == '获取验证码' || this.data.text == '重新获取'){
      this.data.time=60;
      this.data.timer=setInterval(()=>{
        this.data.time--;
        if (this.data.time<0){
          this.setData({
            text:'重新获取'
          })
          clearInterval(this.data.timer);
        }else{
          this.setData({
            text: `${this.data.time}S`
          })
        }
        
      },1000)
    }
  },
  // 手机号
  onPhone(e){
    this.data.phone=e.detail.value
   this. _yanzheng()
  },
  onNum(e){
    this.data.code = e.detail.value
    this._yanzheng()
  },

  // 登陆
  onLogin(){
    if (getCurrentPages().length > 1) {
      // wx.navigateBack()
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  //验证输入内容
  _yanzheng(){
    if (this.data.phone.length > 0 && this.data.code.length > 0){
      this.setData({
        show:true
      })
    }else{
      this.setData({
        show: false
      })
    }
  }




})