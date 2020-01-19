import {getMultiData} from '../../service/home.js'
Page({

  data: {
    banners: [],
    recommends: [],
    titles: ['新款', '流行', '精选']
  },

  onLoad: function (options) {
    // 请求轮播图及推荐数据
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },

  handleTabClick(e) {
    const index = e.detail.index
    console.log(index)
  }
})