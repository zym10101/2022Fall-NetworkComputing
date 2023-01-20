// pages/publish/publish.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //展示给用户的数据
        multiArray: [
            [0,1,2,3,4,5],
            [0,1,2,3,4,5,6,7,8,9]
        ],
        multiIndex: [0, 0, 0],
        //储备数据
        pickerList:[
            [0,1,2,3,4,5,6,7,8,9],
            [0,1,2,3,4,5,6,7,8,9],
            [0,1,2,3,4,5,6,7,8,9],
            [0,1,2,3,4,5,6,7,8,9],
            [0,1,2,3,4,5,6,7,8,9],
            [0]

        ],
        select: false,
        desc:" ",
        score: 0.0,
        did: 0
    
    },
  
    toPublish(){
      let num1 = this.data.multiArray[0][this.data.multiIndex[0]];
      let num2 = this.data.multiArray[1][this.data.multiIndex[1]]
      let score = num1 + num2 * 0.1;
      const uid = wx.getStorageSync('uid');
      // const { nickName }= wx.getStorageSync('userInfo');

      const userInfo = wx.getStorageSync('userInfo');
      if(userInfo){
        const{nickName} = userInfo;
        this.setData({
          nickName
        })
      }else{
        this.setData({
          nickName : "用户未登录"
        })
      }

    wx.request({
      url: 'https://wx.naughtycat.xyz/comment/add',
      method: 'POST',
      data: {
        "uid": uid,
        "username": this.data.nickName,
        "did": this.data.did,
        "score": score,
        "content":this.data.desc,
      },
      
      success: function (res) {
        wx.navigateBack({
          delta: 1,
          success: () =>{
              wx.showToast({
                  icon: 'none',
                title: '发布成功',
              })
          }
        })
      }
    })

    //更新评分
    wx.request({
      url: 'https://wx.naughtycat.xyz/update',
      success: function(res){
      }
    })
      },

    selectType(e){
        const { id } = e.currentTarget.dataset;
        this.setData({
            type: id
        })

    },

    getDesc(e){
        this.setData({
            desc:e.detail.value
        })
    },

    bindMultiPickerChange(e){
        this.setData({
            select: true
        })
    },

    bindMultiPickerColumnChange(e){
        let { column, value} = e.detail;
        let data = this.data;
        let {multiArray, pickerList} = this.data;
        if(column == 0){
            multiArray[1] = pickerList[value];
        }
        data.multiArray = multiArray;
        data.multiIndex[column] = value;
        this.setData(data);

        
    },

    closeSelect(){
        this.setData({
            select: false,
            multiIndex: [0,0],
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
          did: JSON.parse(options.id)
        })
  
    }
})