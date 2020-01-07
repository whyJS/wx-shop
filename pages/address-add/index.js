// pages/address-add/index.js
import { getAreaInfo } from '../../utils/cityArray.js'
var arrays = getAreaInfo();//在头部引入 省市区地址js,这里封装成了方法了。

import { AddressModel } from '../../models/address.js'
const addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citysIndex: [0, 0, 0], //给一个初始值索引，因为有三列，所以3个0
    name:'',
    phone:'',
    addressdetail:'',
    ssq:'请选择',
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type&&options.type==1){
      console.log(options)
      this.data.type = 1
      this.setData({
        type: 1,
        name: options.name,
        phone: options.phone,
        addressdetail: options.address,
        id: options.id
      });
    }




    var that = this;
    // if (wx.getStorageSync('global_cityData')) {
    //   var cityArray = wx.getStorageSync('global_cityData');
    //   var cityArrayCode = wx.getStorageSync('global_cityDataCode');
    // } else {
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

      
    //   wx.setStorageSync('global_cityData', cityArray);
    //   wx.setStorageSync('global_cityDataCode', cityArrayCode);
    // // }
    // console.log("********")
    console.log(cityArray)
    console.log(cityArrayCode)
    this.data.cityArray = cityArray
    this.data.cityArrayCode = cityArrayCode
    // that.setData({
    //   cityArray: cityArray,
    //   cityArrayCode: cityArrayCode
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('*****')
    console.log(this.data)
    this.setData({
      cityArray: this.data.cityArray,
      cityArrayCode: this.data.cityArrayCode
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    this.setData({
      cityArray: this.data.cityArray,
      cityArrayCode: this.data.cityArrayCode
    });
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
    if(this.data.type==1){
      this._api_updata()
    }else{
      this._api_add()
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
    var cityArrayCode = that.data.cityArrayCode;

    var list1 = []; //存放第二列数据，即市的列
    var list2 = []; //存放第三列数据，即区的列
    var list1Code = []; //存放第二列数据，即市的列
    var list2Code = []; //存放第三列数据，即区的列


    var citysIndex = [];
    console.log(e)
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


    switch (e.detail.column) {
      case 0:
        //滑动左列
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['code'] == cityArrayCode[0][e.detail.value]) {
            var shengCode = arrays[i]['sheng'];
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
            list1Code.push(arrays[i]['code']);
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == arrays[1]['di']) {
            list2Code.push(arrays[i]['code']);
          }
        }

        that.setData({
          global_sheng_code: sheng
        });
        break;
      case 1:
        //滑动中列
        var diCode;
        var shengCode = that.data.global_sheng_code;
        list1Code = cityArrayCode[1];
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['code'] == cityArrayCode[1][e.detail.value]) {
            diCode = arrays[i]['di'];
          }
        }
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == diCode) {
            list2Code.push(arrays[i]['code']);
          }
        }
        

        break;
      case 2:
        //滑动右列
        list1Code = cityArrayCode[1];
        list2Code = cityArrayCode[2];
        break;
    }
    console.log(citysIndex)
    that.setData({
      "cityArray[1]": list1,//重新赋值中列数组，即联动了市
      "cityArray[2]": list2,//重新赋值右列数组，即联动了区
      "cityArrayCode[1]": list1Code,//重新赋值中列数组，即联动了市
      "cityArrayCode[2]": list2Code,//重新赋值右列数组，即联动了区
      citysIndex: citysIndex,//更新索引
      ssq: ssq,//获取选中的省市区
    });
    console.log(this.data)
  },
  _api_add(){
    addressModel.GetAddAddress({
      provinceCode: this.data.cityArrayCode[0][this.data.citysIndex[0]],
      cityCode: this.data.cityArrayCode[1][this.data.citysIndex[1]],
      countyCode: this.data.cityArrayCode[2][this.data.citysIndex[2]],
      address: this.data.addressdetail,
      phone: this.data.phone,
      consignee: this.data.name
    }).then((res)=>{
      if (res.result == 200) {
        wx.navigateBack()

      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

   _api_updata() {
     console.log(this.data.citysIndex)
     console.log(this.data.cityArrayCode)
     console.log(this.data.cityArray)
     addressModel.GetUpdataAddress({
      provinceCode: this.data.cityArrayCode[0][this.data.citysIndex[0]],
      cityCode: this.data.cityArrayCode[1][this.data.citysIndex[1]],
      countyCode: this.data.cityArrayCode[2][this.data.citysIndex[2]],
      address: this.data.addressdetail,
      phone: this.data.phone,
      consignee: this.data.name,
      id:this.data.id
    }).then((res) => {
      if (res.result == 200) {
        wx.navigateBack()

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