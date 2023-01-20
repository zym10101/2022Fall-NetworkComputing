// pages/myCollection/myCollection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailStorage:{},
    nickName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      const{avatarUrl,nickName} = userInfo;
      this.setData({
        avatarUrl,
        nickName
      })
    }
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/user/star/' + that.data.nickName,
      method: 'GET',
      success: function (res) {
        that.setData({
          dishes: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/user/star/' + that.data.nickName,
      method: 'GET',
      success: function (res) {
        that.setData({
          dishes: res.data.result
        })
      }
    })
  }
})