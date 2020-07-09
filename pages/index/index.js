//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //存储轮播图的文告
    swiperMovies:[
      'http://m.iqiyipic.com/common/lego/20200614/cf339912845b47e2ab72f4d608a7e0ee.jpg',
      'http://m.iqiyipic.com/common/lego/20200612/45a165043de4414387d81b6e4bdd61b3.jpg',
      'http://m.iqiyipic.com/common/lego/20200612/635f5500a9994c5c8967749ea9929b18.jpg',
      'http://m.iqiyipic.com/common/lego/20200613/26dfd274bc224a74bc1a746b958eedcb.jpg',
      'http://m.iqiyipic.com/common/lego/20200605/a22767ec30474dda9354dd4cba413487.jpg',
    ],
    //存储各类的影片信息--对象类型
    boards:{
      //正在上映的影片
      'in_theaters':{
          //从第几条记录开始(从0开始编号)
          start:0,
          //返回的记录数量
          count:4,
          //存储具体的影片信息
          movies:[],
          //分类标题信息
          title:""
      }, 
      //即将上映的影片
      'coming_soon':{
        start:0,
        count:4,
        movies:[],
        title:""
      },
      //TOP250的影片
      'top250':{
        start:0,
        count:12,
        movies:[],
        title:""
      }     
    }
  },
  
  //加载影片信息
  /**
   * type表示影片的类型,字符串,可选值有in_theaters coming_soon top250
  */
  loadMovies(type,start,count){
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + type + '?apikey=0df993c66c0c636e29ecbb5344252a4a&start=' + start +'&count=' + count,
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        //对象暂存
        let object = {};
        //存储所有的影片信息
        object['boards.' + type + '.movies'] = res.data.subjects;
        //存储分类的标题类型
        object['boards.' + type + '.title'] = res.data.title.toUpperCase();
        //console.log(object);
        this.setData(object);
      }
    });   
  },
  onLoad: function () {

    
    //显示加载提示框
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
    //通过循环结构加载相关分类的影片信息
    //in_theaters,coming_soon,top250
    Object.keys(this.data.boards).map(key=>{
        this.loadMovies(key,this.data.boards[key].start,this.data.boards[key].count);
    });
    //console.log(this.data.boards);

    //获取轮播广告 
    /*
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10',
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          swiperMovies:res.data.subjects
        })
      }
    });
    */
    //隐藏加载提示框
    wx.hideLoading();


    /*
    //获取现在上映的电影
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=4',
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        //console.log(res.data.subjects);
        this.setData({
          //怎么将变量变量名称?
          'boards.new':res.data.subjects
        });
      }
    });       

    //获取即将上映的影片
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=4',
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          'boards.coming':res.data.subjects
        });
      }
    });    

    //获取TOP250的影片
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=12',
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          'boards.top':res.data.subjects
        });
      }
    });     
  */
  }
})
