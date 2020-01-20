import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
Page({

  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    }
  },

  onLoad: function (options) {
    // 1.请求轮播图及推荐数据
    this._getMultiData()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    // this._getGoodsData('sell')
  },

  //------------- 请求轮播图及推荐数据----------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },

  // ------------ 请求商品列表数据-------------------
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1
    // 2.请求数据
    getGoodsData(type, page).then(res => {
      // 2.1 取出数据
      const list = res.data.data.list
      // 2.2 将数据设置到对应 type 的 list 中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 2.3 将数据设置到 data 的 goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })

    })
  },

  //------------- 处理 tab 点击----------------------
  handleTabClick(e) {
    const index = e.detail.index
    console.log(index)
  }
})