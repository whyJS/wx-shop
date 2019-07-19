// components/add/add.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 1
    },
    index:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAdd(){
      this.triggerEvent('add', this.data.index, {})
    },
    onDelete(){
      this.triggerEvent('delete', this.data.index, {})
    }
  }
})
