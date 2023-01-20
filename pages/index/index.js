const app = getApp()

const imageCdn = '../../images';
const swiperList = [
  {
    image: `${imageCdn}/001.jpeg`,
  },
  {
    image: `${imageCdn}/002.jpeg`,
  },
  {
    image: `${imageCdn}/003.jpeg`,
  }
];

Page({
  data: {
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList,
    dishes: [],
    display_dishes: [],
    filterId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this
    wx.request({
      url: 'https://wx.naughtycat.xyz/dish/query',
      data: {
        "num": 100 //推荐页最多显示100条数据
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          dishes: res.data.result,
          display_dishes: res.data.result
        })
      }
    })
  },
  /**
   * 搜索内容变化时页面数据跟随变化
   */
  onChange(e) {
    this.setData({
      value: e.detail.value,
    });
  },
  /**
   * 排序方式的选择
   */
  tapFilter: function (e) {
    switch (e.currentTarget.dataset.id) {
      // 默认排序
      case '0':
        this.data.display_dishes.sort(
          (a, b) => { return a.id - b.id }
        );
        break;
      // 高分榜单
      case '1':
        this.data.display_dishes.sort(
          (a, b) => { return b.score - a.score }
        );
        break;
      // 低价优先
      case '2':
        this.data.display_dishes.sort(
          (a, b) => { return a.price - b.price }
        );
        break;
    }
    this.setData({
      filterId: e.currentTarget.dataset.id,
      display_dishes: this.data.display_dishes
    });
  },
  /**
   * 搜索框提交表单数据
   */
  handleSubmit(e) {
    let value = e.detail.value
    var dishes = this.searchDish(value)
    this.setData({
      display_dishes: dishes
    });
  },
  /**
   * 搜索功能（模糊查询）
   */
  searchDish(name) {
    var targetDishes = []
    for (var i = 0; i < this.data.dishes.length; i++) {
      if (this.data.dishes[i].name.includes(name)) {
        targetDishes.push(this.data.dishes[i])
      }
    }
    return targetDishes;
  },
  /**
   * 搜索框为空时重新加载数据
   */
  handleClear() {
    this.onLoad()
  }
});
