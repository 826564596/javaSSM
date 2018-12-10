
App({
  //js中如果一个变量绑定到一个非基本数据类型(Array, Function, Object)，属于引用传递，采用深度复制拷贝(JSON.parse(JSON.stringify())可以防止改变原对象数据
  globalData: {
    userInfo: null,
    serverUrl: "http://10.10.122.192:5757/ssm-web/user",
    // serverUrl: "http://2g108263u5.imwork.net:51055/ssm-web/user",
    agencyInfo: null,  //机构信息
    teacherList: null,  //授课教师列表
    allCourseList: null,  //全部课程列表
    eCourseList: null,  //体验课列表
    tCourseList: null,  //精品课列表
    userBookingList: null,  //用户所有约课记录
    userSignRecordList: null, //用户今天的课程签到记录
    scheduleCid: null, //传入课表页的匹配课程编号
    questionInfo:null//提问列表
  },

  // 监听小程序初始化v3
  onLaunch: function(){
    console.log("小程序开始初始化");
  },

  // 监听小程序初始化v2
  // onLaunch: function () {
  //   console.log("小程序开始初始化");
  //   var sid = wx.getStorageSync("sid");
  //   console.log("查询本地存储的sid：");
  //   console.log(sid);
  //   if (!sid) {
  //     console.log("获取本地sid失败，准备重新向服务器获取sid及用户个人信息");
  //     wx.login({
  //       success: res => {
  //         var code = res.code;
  //         if (code) {
  //           console.log("获取用户登陆凭证: " + code);
  //           wx.getSetting({  //获取用户授权状态
  //             success: res => {
  //               if (res.authSetting['scope.userInfo']) { //用户已授权，则可调用wx.getUserInfo得到用户信息
  //                 console.log("用户已授权.......");
  //                 wx.getUserInfo({
  //                   success: res => {
  //                     console.log("getUserInfo接口返回值：");
  //                     console.log(res);
  //                     this.globalData.userInfo = res.userInfo  //全局保存获得的用户个人信息(也可向后台服务器获取)
  //                     // 可以将 res 发送给后台解码出 unionId
  //                     // 发送 res.code 到后台换取 自定义登陆状态sid(sessionId)
  //                     wx.request({
  //                       url: this.globalData.serverUrl + '/login2',
  //                       data: {
  //                         code: code,
  //                         encryptedData: res.encryptedData,
  //                         iv: res.iv
  //                       },
  //                       header: {
  //                         'content-type': 'application/json'
  //                       },
  //                       success: res => {
  //                         if ("sid" in res.data) {
  //                           console.log(res) //获取sid
  //                           var sid = res.data.sid;
  //                           wx.setStorageSync("sid", sid); // 本地存储登陆状态sid
  //                           var id = wx.getStorageSync("sid");
  //                           console.log("向服务器重新获取的sid：");
  //                           console.log(id);
  //                           // this.getUserInfo();
  //                         } else {
  //                           console.log("获取自定义登陆状态sessionid失败");
  //                         }
  //                       }
  //                     })

  //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //                     // 所以此处加入 callback 以防止这种情况
  //                     if (this.userInfoReadyCallback) {
  //                       this.userInfoReadyCallback(res)
  //                     }
  //                   }
  //                 })
  //               } else {  //用户还未授权，则先去登录页引导用户授权
  //                 console.log("用户未授权，准备去登录页");
  //                 wx.navigateTo({
  //                   url: '/pages/login/login',
  //                 })
  //               }
  //             }
  //           });

  //         } else {
  //           console.log('wx.login获取用户登录态失败：' + res.errMsg);
  //         }
  //       }
  //     })
  //   } else{
  //     console.log("获取本地sid成功，准备跳转主页");
  //   }
  // },

  // 监听小程序初始化v1
  // onLaunch: function () {
  //   console.log("小程序开始初始化");
  //   var sid = wx.getStorageSync("sid");
  //   console.log("查询本地存储的sid：");
  //   console.log(sid);
  //   if(!sid){
  //     console.log("获取本地sid失败，准备重新向服务器获取sid");
  //     wx.login({
  //       success: res => {
  //         var code = res.code;
  //         if (code) {
  //           console.log("获取用户登陆凭证: " + res.code);
  //           // 发送 res.code 到后台换取 自定义登陆状态sid(sessionId)
  //           wx.request({
  //             url: this.globalData.serverUrl + '/login',
  //             data: {
  //               code: res.code
  //             },
  //             header: {
  //               'content-type': 'application/json'
  //             },
  //             success: res => {
  //               if ("sid" in res.data) {
  //                 console.log(res) //获取sid
  //                 var sid = res.data.sid;
  //                 wx.setStorageSync("sid", sid); // 本地存储登陆状态sid
  //                 var id = wx.getStorageSync("sid");
  //                 console.log("向服务器重新获取的sid：");
  //                 console.log(id);
  //                 // this.getUserInfo();
  //               } else {
  //                 console.log("获取自定义登陆状态sessionid失败");
  //               }
  //             }
  //           })

  //         } else {
  //           console.log('获取用户登录态失败：' + res.errMsg);
  //         }
  //       }
  //     })
  //   }
  //   this.getUserInfo();
  // },

  // 获取用户信息
  getUserInfo: function () {
    console.log("开始获取用户信息(app.js->getUserInfo)");
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户信息已授权");
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("getUserInfo接口返回值：");
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("用户信息未授权，需重新获取授权");
        }
      }
    })
  }

})