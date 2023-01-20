// pages/demo3/demo3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    avatarUrl:'',
    nickName:'',
    cellList:[
      {
        url:'../../corn/myinfo_tihuan.png',
        text:'我的信息',
        page:'../myInfo/myInfo'
      },
      {
        url:'../../corn/collection.png',
        text:'我的收藏',
        page:'../myCollection/myCollection'
      },
      {
        url:'../../corn/exitlog.png',
        text:'退出登录'
      }
    ]
  },
  
  toDetail(e){
    const{page} = e.currentTarget.dataset;
    if(page){
      wx.navigateTo({
        url: page,
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'确定退出吗',
        success:(res)=>{
          const{confirm} = res;
          if(confirm){
            wx.removeStorageSync('login');
            // 清楚缓存区个人信息
            wx.removeStorageSync('userInfo');
            this.setData({
              login:false
            })
          }
        }
      })
    }
  },

  toLogin(){
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        const { userInfo : { avatarUrl, nickName } } = res;
        const userInfo = {
          avatarUrl, 
          nickName
        }
        wx.setStorageSync('userInfo', userInfo); //存缓存
        wx.setStorageSync('login', true);
        this.setData({
          login: true
        })
      },    
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    const login = wx.getStorageSync('login');
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      const{avatarUrl,nickName} = userInfo;
      this.setData({
        avatarUrl,
        nickName
      })
      // 此处request没有放在toLogin而是onLoad
      wx.request({
        url: 'https://wx.naughtycat.xyz/user/login',
        method: 'POST',
        data: {
        "username": userInfo.nickName
        },
        success:function(res){
          wx.setStorageSync('uid', res.data.result);
        }
      })
    }
    
    this.setData({
      login : !!login, // 空取双反更严谨
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      const{avatarUrl,nickName} = userInfo;
      this.setData({
        avatarUrl,
        nickName
      })
    }
  }
})