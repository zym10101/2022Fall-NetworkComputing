// pages/category/category.js
const app = getApp()
const imageCdn = '../../images';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canteens: [],
    curNav: 0,
    curIndex: 0,
    dishes: []
  },

  //事件处理函数
  switchRightTab: function (e) {
    console.log(e)
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
    this.selectCanteen(id)
  },

  // 选择食堂id，加载菜品信息
  selectCanteen(id) {
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/dish/query',
      data: {
        "cid": id
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          dishes: res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/canteen',
      method: 'GET',
      success: function (res) {
        that.setData({
          canteens: res.data.result
        })
      }
    })
    // 初始化加载第一食堂的菜品信息
    this.selectCanteen(1)
  }
});