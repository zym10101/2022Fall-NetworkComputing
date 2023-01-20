// pages/myInfo/moInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:'',
    avatarUrl:'',
    nickName:'',
    edit: false,
    _phone:'',//缓存中的phone
    phone:'',

  },

  toEdit(){
    this.setData({
        edit: !this.data.edit,
        phone: this.data._phone
    })
},

getPhone(e){
    const { value } =e.detail;
    this.setData({
        phone:value
    })
},

deletePhone(e){
    this.setData({
        phone:''
    })
},
saveChange(){
    let userInfo = wx.getStorageSync('userInfo');
    userInfo = {
        ...userInfo,
        phone: this.data.phone
    };
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
        edit: false,
        _phone: this.data.phone
    })

},

  getSign(e){
    const {value} = e.detail; 
    this.setData({
      sign: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const{avatarUrl,nickName,sign,phone} = wx.getStorageSync('userInfo');
   
    this.setData({
      avatarUrl,
      nickName,
      sign,
      _phone: phone,
      phone
    })
  },
})