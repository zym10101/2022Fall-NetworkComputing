// pages/dish/dish.js
// 如何判断菜品是否收藏过？

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dish: {},
    dish_ID: null,
    collected: false,
    dishImg: [],
    collectionIcon: ['../../images/collection.png'],
    commentList: [],
    nickName:"",
    canteens:"",
    cid:0
  },
  toCollection() {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
        // 更新本地状态
        this.setData({
          nickName: userInfo.nickName
        })
        let collected = !this.data.collected;
        this.setData({
          collected: collected
        });
        if (collected) {
          this.setData({
            collectionIcon: '../../images/collection_fill.png'
          })
        } else {
          this.setData({
            collectionIcon: '../../images/collection.png'
          })
        }
        // 数据库更新
        var that = this;
        wx.request({
          url: 'https://wx.naughtycat.xyz/user/star/' + that.data.nickName + '/' + that.data.dish_ID,
          method: 'GET'
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '您还未登录',
      })
    }
  },
  /**
   * 
   */
  makeComment() {
    wx.navigateTo({
      url: '../makeComment/makeComment?id='+ JSON.stringify(this.data.dish_ID)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取名称，根据名称获取数据库中收藏内容,获取成功则遍历以判断当前菜品是否被收藏
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){ // 考虑未登录状态
      const{avatarUrl,nickName} = userInfo;
      this.setData({
        avatarUrl,
        nickName
      })

      var that = this
      wx.request({
        url: 'https://wx.naughtycat.xyz/user/star/' + userInfo.nickName,
        method: 'GET',
        success: function (res) {
          that.setData({
            dishes: res.data.result
          })
          var tp = res.data.result
          if(tp){
            tp.forEach(item=>{
              if(item.id == options.id){
                that.setData({
                  collected: true,
                  collectionIcon: '../../images/collection_fill.png'
                })
              }
            })
          }
        }
      })
    }
    this.selectedDishDetail(options.id)
    this.selectedCommentDetail(options.id)
   
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.dish_ID != null){
    this.selectedCommentDetail(this.data.dish_ID)
    }
    
  },

  selectedDishDetail(id) {
    var that = this
    var cid = 0;
    wx.request({
      url: 'https://wx.naughtycat.xyz/dish/query',
      data: {
        "did": id
      },
      method: 'POST',
      
      success: function (res) {
        that.setData({
          dish: res.data.result[0],
          dish_ID: id,
          dishImg: res.data.result[0].indexImgUrl,
        })
        cid = res.data.result[0].cid
      },
      
      
    }),
   
    wx.request({
      url: 'https://wx.naughtycat.xyz/canteen',
      method: 'GET',
      success: function (res) {
        that.setData({
          canteens: res.data.result[cid - 1].name
        })
      }
    })

  },
  selectedCommentDetail(id) {
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/comment/query',
      data: {
        "did": id
      },
      method: 'POST',
      success: function (res) {
         that.setData({
          commentList: res.data.result
        })
      }
    })
  },
 
})


  
