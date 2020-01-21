import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000

Page({

  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  onLoad: function (options) {
    // 1.请求轮播图及推荐数据
    this._getMultiData()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
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
    this.setData({
      currentType: types[index]
    })
  },

  handleImgLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  onReachBottom() {
    this._getGoodsData(this.currentType)
  },

  onPageScroll(options) {
    const scroll = options.scrollTop
    const flag = scroll >= TOP_DISTANCE
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    const flag2 = scroll >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})