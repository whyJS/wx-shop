// components/search-word/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    query:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event){
      this.triggerEvent('searchConfirm', event.detail, {})
    },
    onCancel(){
      this.triggerEvent('searchCancel', {}, {})
    }
  }
})
