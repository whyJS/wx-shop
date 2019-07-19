// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value:'搜索你想要的商品'
    },
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
    onSearch(event){
      this.triggerEvent('onSearch', event.detail, {})
    }
  }
})
