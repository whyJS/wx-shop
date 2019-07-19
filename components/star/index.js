// components/star/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        this.changeList(newVal)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[0,0,0,0,0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeList(val){
      if(val==0){
        this.setData({
          list: [0, 0, 0, 0, 0]
        })
      } else if (val == 1){
        this.setData({
          list: [1, 0, 0, 0, 0]
        })
      } else if (val == 2) {
        this.setData({
          list: [1, 1, 0, 0, 0]
        })
      } else if (val == 3) {
        this.setData({
          list: [1, 1, 1, 0, 0]
        })
      } else if (val == 4) {
        this.setData({
          list: [1, 1, 1, 1, 0]
        })
      } else if (val == 5) {
        this.setData({
          list: [1, 1, 1, 1, 1]
        })
      }
    }
  }
})
