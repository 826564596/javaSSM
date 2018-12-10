
var app = getApp();

var a;
Page({







  // data: {
  //   items: [
  //     //第一首
  //     {
  //       name: 'I Am You',
  //       author: 'Kim Taylor',
  //       poster: 'http://xxx.xxx.xxx.xxx:8080/images/music/20171122164628.jpg',
  //       src: 'http://xxx.xxx.xxx.xxx:8080/images/music/Kim Taylor - I Am You.mp3',
  //       action: 'pause',
  //     },
  //     //第二首
  //     {
  //       name: 'Just As I Am',
  //       author: 'Air Supply',
  //       poster: 'http://xxx.xxx.xxx.xxx:8080/images/music/742008777.jpg',
  //       src: 'http://xxx.xxx.xxx.xxx:8080/images/music/Air Supply - Just As I Am - Digitally Remastered 1999.mp3',
  //       action: 'pause',
  //     },
  //     //第三首
  //     {
  //       name: '追梦人',
  //       author: '群星-轻音乐',
  //       poster: 'http://xxx.xxx.xxx.xxx:8080/images/music/210136823.jpg',
  //       src: 'http://xxx.xxx.xxx.xxx:8080/images/music/群星 - 追梦人.mp3',
  //       action: 'pause',
  //     },
  //     //第肆首
  //     {
  //       name: '七月上',
  //       author: 'Jam',
  //       poster: 'http://xxx.xxx.xxx.xxx:8080/images/music/1589703900.jpg',
  //       src: 'http://xxx.xxx.xxx.xxx/images/music/Jam - 七月上.mp3',
  //       action: 'pause',
  //     },
  //     //第伍首
  //     {
  //       name: '世界が终わるまでは…',
  //       author: 'WANDS',
  //       poster: 'http://xxx.xxx.xxx.xxx:8080/images/music/933843024.jpg',
  //       src: 'http://xxx.xxx.xxx.xxx:8080/images/music/WANDS - 世界が终わるまでは….mp3',
  //       action: 'pause',
  //     }
  //   ]
  // },


data:{
  questionInfo:null,
},


















onLoad:function(options){
  wx.setNavigationBarTitle({
    title: '我的问题'
  })
  a = options.name;

  console.log(a);

  wx.request({
    url: app.globalData.serverUrl + '/getQuestion',
    data: {
      a: a
    },
    header: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    success: res => {
      
      app.globalData.questionInfo=res.data.questionInfo,
        console.log(app.globalData.questionInfo),
      wx.showToast({
        title: '获取成功',
        icon: 'success',
        duration: 1500
      });

      this.setData({
        questionInfo: app.globalData.questionInfo,
        // bookings: app.globalData.userBookingList
      })
      console.log(app.globalData.questionInfo)
    } 


})
  
},
})