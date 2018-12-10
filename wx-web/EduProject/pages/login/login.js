const app = getApp()
Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function(){
    var sid = wx.getStorageSync("sid");
    console.log("查询本地存储的sid：");
    console.log(sid);

    // 本地存在sid
    if(sid){
      console.log("查询用户信息授权状态：");
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("用户信息已授权");
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo  //全局保存已获得的用户个人信息
                console.log(res.userInfo);
                console.log("已授权状态下获得用户信息，保存到全局后打印：");
                console.log(app.globalData.userInfo);
                // 拿到用户信息后转向主页
                console.log("准备跳转到首页");
                if (res.userInfo) {
                  wx.switchTab({
                    url: '../index/index',
                  });
                }
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          } else {
            console.log("用户信息未授权");
          }
        }
      });
    }else{
      console.log("本地sid为空，需授权登录后并获取");
    }
    
  },

  // 登录按钮绑定事件
  getUserInfo: function(e) {
    console.log("按钮绑定事件返回的e.detail：");
    console.log(e.detail);
    var errMsg = e.detail.errMsg;
    if (errMsg =="getUserInfo:ok"){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      app.globalData.userInfo = e.detail.userInfo;  //全局保存已获得的用户个人信息
      console.log("用户已授权，小程序已获得用户信息");
      // 调用后台服务，获取sid
      wx.login({
        success: res => {
          var code = res.code;
          if (code) {
            console.log("login页获取用户登陆凭证: " + res.code);
            // 发送 res.code 到后台换取 自定义登陆状态sid(sessionId)
            wx.request({
              url: app.globalData.serverUrl + '/login2',
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
              },
              success: res => {
                if ("sid" in res.data) {
                  console.log(res) //获取sid
                  var sid = res.data.sid;
                  wx.setStorageSync("sid", sid); // 本地存储登陆状态sid
                  var id = wx.getStorageSync("sid");
                  console.log("login页向服务器重新获取的sid：");
                  console.log(id);
                  // 拿到用户信息后转向主页
                  wx.switchTab({
                    url: '../index/index',
                  });
                } else {
                  console.log("获取自定义登陆状态sessionid失败");
                }
              }
            })

          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      })
    }
    
  
  }

})