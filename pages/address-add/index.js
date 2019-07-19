// pages/address-add/index.js
import { getAreaInfo } from '../../utils/cityArray.js'
var arrays = getAreaInfo();//在头部引入 省市区地址js,这里封装成了方法了。
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citysIndex: [0, 0, 0], //给一个初始值索引，因为有三列，所以3个0
    name:'',
    phone:'',
    addressdetail:'',
    ssq:'请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('global_cityData')) {
      var cityArray = wx.getStorageSync('global_cityData');
      var cityArrayCode = wx.getStorageSync('global_cityDataCode');
    } else {
      //定义三列空数组
      var cityArray = [
        [],
        [],
        [],
      ];
      var cityArrayCode = [
        [],
        [],
        [],
      ];
      for (let i = 0, len = arrays.length; i < len; i++) {
        switch (arrays[i]['level']) {
          case 1:
            //第一列
            cityArray[0].push(arrays[i]["name"]);
            cityArrayCode[0].push(arrays[i]["code"]);
            break;
          case 2:
            //第二列(默认由第一列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng']) {
              cityArray[1].push(arrays[i]["name"]);
              cityArrayCode[1].push(arrays[i]["code"]);
            }
            break;
          case 3:
            //第三列(默认第一列第一个、第二列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng'] && arrays[i]['di'] == arrays[1]['di']) {
              cityArray[2].push(arrays[i]["name"]);
              cityArrayCode[2].push(arrays[i]["code"]);
            }
            break;
        }
      }
      wx.setStorageSync('global_cityData', cityArray);
      wx.setStorageSync('global_cityDataCode', cityArrayCode);
    }

    that.setData({
      cityArray: cityArray,
      cityArrayCode: cityArrayCode
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onName(e){
    this.setData({
      name: e.detail.value
    })
  },
  onPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onAddress(e) {
    this.setData({
      addressdetail: e.detail.value
    })
  },
  onClick(e) {
    if (!this.data.name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (!this.data.ssq||this.data.ssq=="请选择") {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (!this.data.addressdetail) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
  },


  func_changeCitysChange: function (e) {
    var that = this;
    var cityArray = that.data.cityArray;

    var address = '';
    if (that.data.ssq == undefined) {
      //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
      var citysIndex = that.data.citysIndex;
      for (let i in citysIndex) {
        address += cityArray[i][citysIndex[i]]
      }
    } else {
      address = that.data.ssq;
    }
  },
  func_changeCitysChangeColumn: function (e) {
    var that = this;
    var cityArray = that.data.cityArray;

    var list1 = []; //存放第二列数据，即市的列
    var list2 = []; //存放第三列数据，即区的列

    var citysIndex = [];
    //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
    switch (e.detail.column) {
      case 0:
        //滑动左列
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[0][e.detail.value]) {
            var sheng = arrays[i]['sheng'];
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
            list1.push(arrays[i]['name']);
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == arrays[1]['di']) {
            list2.push(arrays[i]['name']);
          }
        }


        citysIndex = [e.detail.value, 0, 0];
        var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + '';

        that.setData({
          global_sheng: sheng
        });
        break;
      case 1:
        //滑动中列
        var di;
        var sheng = that.data.global_sheng;
        list1 = cityArray[1];
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[1][e.detail.value]) {
            di = arrays[i]['di'];
          }
        }
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == di) {
            list2.push(arrays[i]['name']);
          }
        }
        citysIndex = [that.data.citysIndex[0], e.detail.value, 0];

        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + '';

        break;
      case 2:
        //滑动右列
        list1 = cityArray[1];
        list2 = cityArray[2];
        citysIndex = [that.data.citysIndex[0], that.data.citysIndex[1], e.detail.value];

        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value] + '';
        break;
    }

    that.setData({
      "cityArray[1]": list1,//重新赋值中列数组，即联动了市
      "cityArray[2]": list2,//重新赋值右列数组，即联动了区
      citysIndex: citysIndex,//更新索引
      ssq: ssq,//获取选中的省市区
    });
  },

})