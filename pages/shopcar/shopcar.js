// pages/shopcar/shopcar.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel()
Page({
  data: {
    showDelete:false,
    text:"编辑"
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this._api_list()
  },
  onAdd(e){
    console.log(e)
  },
  onDelete(e){

  },
  onShowDelete(){
    if(this.data.showDelete){
      this.setData({
        text:"编辑",
        showDelete:false
      })
    }else{
      this.setData({
        text: "完成",
        showDelete: true
      })
    }
  },

  // 购物车列表
  _api_list(){
    goodsModel.GetCarList().then((res)=>{
      console.log(res)
    })
  }
})