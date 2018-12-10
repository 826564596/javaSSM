// pages/user/user.js
const app = getApp();
var utils = require("../../utils/util.js");

Page({

  data: {
    userInfo: null,
    isshowmenu: true,  //默认显示微培训主菜单
    isshowbooking: false,  //默认不显示约课记录
    bookings: [],
    isshowmycourse: false,  //默认不显示我的课程
    myCourseList: []
  },

  onLoad: function (options) {
    console.log("user.wxml加载中");
    // this.getMyCourseList();
    this.setData({
      userInfo: app.globalData.userInfo,
      // bookings: app.globalData.userBookingList
    })
  },

  /**
   * 每次刷新页面时，加载页面绑定数据
   */
  onShow: function () {
    console.log("user.wxml is onShow");
    this.getMyCourseList();
    this.setData({
      bookings: app.globalData.userBookingList
    })
  },

  /**
   * 获取我的课程(从约课记录中筛选)
   */
  getMyCourseList: function(){
    var bookingList = JSON.parse(JSON.stringify(app.globalData.userBookingList));
    var courseList = [];
    var len = bookingList.length;
    for(var i = 0; i < len; i++){
      courseList.push(bookingList[i].course);
    }
    this.setData({
      myCourseList: courseList
    })
  },

  /**
   * 微培训主菜单展开或收缩
   */
  onToggleTap: function (e) {
    this.data.isshowmenu = !this.data.isshowmenu;  //基本数据类型值传递
    this.setData({ isshowmenu: this.data.isshowmenu });
  },
  
  /**
   * 约课记录展开或收缩
   */
  onBookingToggle: function(e){
    this.data.isshowbooking = !this.data.isshowbooking; 
    this.setData({ isshowbooking: this.data.isshowbooking });
  },

  /**
   * 我的课程展开或收缩
   */
  onMyCourseToggle: function(e){
    this.data.isshowmycourse = !this.data.isshowmycourse;
    this.setData({ isshowmycourse: this.data.isshowmycourse });
  },

  /**
   * 转课程详情页
   */
  toShowDetail: function (event) {
    var ctype = event.currentTarget.dataset.ctype;
    var cid = event.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../index/course-detail/course-detail?type=' + ctype + '&id=' + cid,
    })
  },


  tapName:function(event){
    var cid = event.currentTarget.dataset.cid;
    var nickName = app.globalData.userInfo.nickName;

    console.log(nickName);
    wx.navigateTo({
      url: '../index/ask/ask?id='+cid +'&name='+nickName,
    })
  },

  ToMyQuestion:function(event){
    var nickName = app.globalData.userInfo.nickName;
  
    wx.navigateTo({
      url: '../index/my-question/my-question?name=' + nickName,
    })
  }

})