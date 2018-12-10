var app = getApp();
// // var input;

// // Page({


// //   /**
// //    * 页面的初始数据
// //    */
// //   data: {
// //     input:"",

// //   },

// //   /**
// //    * 生命周期函数--监听页面加载
// //    */
// //   onLoad: function (options) {
// //     wx.setNavigationBarTitle({
// //       title: '提出问题'
// //     })
// //     console.log(options.id);
// //   },
// //   bindTextAreaBlur:function(e){
// //     // input=e.currentTarget.value

// //     console.log(e.currentTarget.dataset.value);

// //   },

// //   askQuestion:function(){
// //     console.log(input);
// //   },
// // })


var a;
var name;
var ceshis;
Page({

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提出问题'
    })
    a = options.id;
    name = options.name;
    console.log(a);
  },

  data: {
    height: 20,
    focus: false,
    ceshi: ''
  },
  
  bindTextAreaBlur: function (e) {
    this.setData({
      ceshi: e.detail.value
    })
    

  },
  formSubmit: function (e) {
      if(this.data.ceshi.length<140){
          wx.request({
              url: app.globalData.serverUrl + '/askQuestion',
              data: {
                  a: a,
                  ceshis: this.data.ceshi,
                  name: name
              },
              header: {
                  'Content-Type': 'application/json;charset=utf-8'
              },

              success: res => {
                  wx.showToast({
                      title: '提问成功',
                      icon: 'success',
                      duration: 1500
                  });
              }
          })

      }else{

          wx.showToast({
              title: '限制：140个以内',
              icon: 'loading',
              duration: 2000
          })

 
  }

}


})




