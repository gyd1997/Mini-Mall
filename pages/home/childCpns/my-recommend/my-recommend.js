// pages/home/childCpns/my-recommend/my-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImgLoad() {
      if(!this.data.isLoad) {
        this.triggerEvent('imgLoad')
        this.data.isLoad = true
      }
    }
  }
})
