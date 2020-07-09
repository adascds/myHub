// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //存储单一影片信息
      movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取当前影片的ID
      let id = options.id;
      //console.log(id);
      //异步获取影片信息
      wx.request({
        url: 'https://api.douban.com/v2/movie/subject/'  + id +'?apikey=0df993c66c0c636e29ecbb5344252a4a',
        method:'GET',
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success:(res)=>{          
          this.setData({
            movie:res.data
          });
          //console.log(this.data.movie);
        }
      });
      
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})