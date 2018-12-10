
const app = getApp()
var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** swiper轮播组件属性值 */
    indicatorDots: true,  //显示面板指示点
    autoplay: true,  //是否自动切换
    interval: 2000,  //自动切换时间间隔
    circular: true,  //是否采用衔接滑动
    agencyInfo:[], //获取的机构信息 
    elist: [], //首页展示第一个体验课
    tlist: [],  //首页展示前两个精品课
    vlist: []  //首页展示一个视频实录
  },

  onLoad: function (options) {
    console.log("主界面开始加载");
    this.getAgencyInfo();
    this.getAllCourseList();
    this.getAllTeacherList();
    this.getBookingRecord();
    this.getSignRecord();//获取用户今天的课程签到记录
  },

  // 点击搜索框绑定事件：跳转到搜索页面
  toShowSearch: function(e){
    wx.navigateTo({
      url: 'search/search',
    })
  },

  // 获取全部课程信息函数
  getAllCourseList: function(){
    wx.request({
      url:app.globalData.serverUrl + '/getAllCourse',
      header: { 'content-type': 'application/json' },
      success: res=>{
        app.globalData.allCourseList = res.data.allCourseList;
        console.log("所有课程信息列表：");
        console.log(app.globalData.allCourseList);
        app.globalData.eCourseList = utils.sortCourseList(app.globalData.allCourseList, "体验课");
        console.log("体验课列表：");
        console.log(app.globalData.eCourseList);
        app.globalData.tCourseList = utils.sortCourseList(app.globalData.allCourseList, "精品课");
        console.log("精品课列表：");
        console.log(app.globalData.tCourseList);
        
        this.setData({
          elist: app.globalData.eCourseList.slice(0, 1),
          tlist: app.globalData.tCourseList.slice(0, 2)
        })
      },
      fail: function(){
        console.log("全部课程信息请求失败!");
      }
    })
  },

  // 获取全部教师函数
  getAllTeacherList: function(){
    wx.request({
      url: app.globalData.serverUrl + '/getAllTeacher',
      header: { 'content-type': 'application/json' },
      success: res => {
        app.globalData.teacherList = res.data.allTeacherList;
        console.log("所有授课教师信息列表：");
        console.log(app.globalData.teacherList);
      },
      fail: function () {
        console.log("全部授课教师列表请求失败!");
      }
    })
  },

  // 获取用户约课记录
  getBookingRecord: function(){
    var sid = wx.getStorageSync("sid");
    wx.request({
      url: app.globalData.serverUrl + '/getBookingRecord',
      data: {
        sid: sid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        app.globalData.userBookingList = res.data.userBookingRecord; //约课列表存入app.js中
        console.log("获取到用户约课记录列表：");
        console.log(app.globalData.userBookingList);
      },
      fail: function () {
        console.log("用户的约课记录列表获取失败");
      }
    })
  },

  // 获取用户课程签到记录
  getSignRecord: function(){
    var sid = wx.getStorageSync("sid");
    wx.request({
      url: app.globalData.serverUrl + '/getSignRecord',
      data: {
        sid: sid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        app.globalData.userSignRecordList = res.data.userSignRecord; //签到记录存入app.js中
        console.log("获取到用户今天的课程签到记录：");
        console.log(app.globalData.userSignRecordList);
      },
      fail: function () {
        console.log("用户今天的课程签到记录获取失败");
      }
    })
  },

  // 获取机构信息函数
  getAgencyInfo: function(){
    wx.request({
      url: app.globalData.serverUrl + '/getAgencyInfo',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        app.globalData.agencyInfo = res.data.agencyInfo; //机构信息存入app.js中
        app.globalData.agencyInfo.gps = {
          address: "福建省福州市闽侯县创业路6号",
          latitude: 26.043675,
          longitude: 119.216448,
          name: "山亚国际中心"
        };
        console.log("已获取到机构信息：");
        console.log(app.globalData.agencyInfo);
        this.setData({
          agencyInfo: app.globalData.agencyInfo
        })
      },
      fail: function () {
        console.log("fail to load agencyInfo");
      }
    })
  },

  // 转机构信息详情页
  goInfoDetail: function(event){
    wx.navigateTo({
      url: 'agency/agency',
    })
  },

  // 转课程详情页
  toShowDetail: function(event){
    var ctype = event.currentTarget.dataset.ctype;
    var cid = event.currentTarget.dataset.cid;
    wx.navigateTo({
      url: 'course-detail/course-detail?type=' + ctype + '&id=' + cid,
    })
  },

  // 转去更多信息页面
  toShowMore: function(event){
    if (this.data.oldvideoContext) {
      this.data.oldvideoContext.pause();//暂停视频播放 
    }
    var pageType = event.currentTarget.dataset.pagetype;
    console.log("收到pageType:");
    console.log(pageType);

    //精品课图标、更多精品课、更多体验课
    if (pageType == 'tCourse' || pageType == 'eCourse'){  
      wx.navigateTo({
        url: 'cmore/cmore?type=' + pageType,
      })
    }else if (pageType == 'video'){  //视频实录图标、更多视频实录
      wx.navigateTo({
        url: 'video/video',
      })
    }else if (pageType == 'teacher'){  //授课老师图标
      wx.navigateTo({
        url: 'teacher/teacher',
      });
    } else if (pageType == 'schedule'){  //培训课表图标
      wx.switchTab({
        url: '../schedule/schedule',
      });
    }
  },

  //视频播放控制
  toPlay: function (e) {
    var that = this;
    var id = e.currentTarget.id
    var videoContext = wx.createVideoContext(id)
    if (this.data.oldvideoContext && this.data.oldvideoContext.domId != videoContext.domId) {
      this.data.oldvideoContext.pause()
    }
    that.setData({
      oldvideoContext: videoContext
    })
  },

  toGps: function(e){
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res);
    //     console.log(res.name)
    //     console.log(res.latitude)
    //     console.log(res.longitude)
    //   },
    //   fail: function () {
    //     console.log("选择地址失败");
    //   },
    // })
    var gps = JSON.parse(JSON.stringify(app.globalData.agencyInfo.gps));
    
    wx.getLocation({
      success: function(res) {
        wx.openLocation({
          latitude: gps.latitude,
          longitude: gps.longitude,
          scale: 18,
          name: gps.name,
          address: gps.address
        });
      },
      fail: function(){
        console.log("获取当前位置失败");
      }
    })
    
  }

  // onReachBottom: function (e) {
  //   console.log("监测到上拉动作");
  // }

})

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
  
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },

//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },

  
// })
