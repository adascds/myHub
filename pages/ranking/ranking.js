// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储电影排行榜的影片数据
    movies:[],
    //当前页码
    page:23,
    //每次返回的记录数量
    count:10,
  },

  /** 
   * 加载影片信息
   * 
   * @param page 页码,从1开始编号
   * 
  */
  loadMovies(page){
    let start = (page - 1) * this.data.count;
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=' + start + '&count=' + this.data.count,
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
          let movies = this.data.movies;
          movies = movies.concat(res.data.subjects);
          this.setData({
            movies:movies
          });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovies(this.data.page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      //增加页码
      let page = this.data.page;
      page++;
      this.setData({
          page:page
      });
      this.loadMovies(this.data.page);
      console.log(this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})