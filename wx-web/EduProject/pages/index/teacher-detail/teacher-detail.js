// pages/index/teacher-detail/teacher-detail.js

const app = getApp();
var utils = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: [],  //当前老师信息
    clist: [],  //主授课程
    subTit: 1  //简介、课程导航标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("授课老师详情页收到参数：");
    console.log(options);
    this.getTeacherInfo(options.tid);
    this.getTeachCourseList(options.tid);
  },

  /**
   * 根据Id匹配获得当前授课老师信息
   */
  getTeacherInfo: function(tid){
    var teacherList = app.globalData.teacherList;
    var len = teacherList.length;
    for (var i = 0; i < len; i++) {
      if (tid == teacherList[i].id) {
        console.log('匹配到当前授课老师信息');
        console.log(teacherList[i]);
        // var teacher = teacherList[i];
        // teacher.teachCourseList = this.getTeachCourseList(teacher.id);
        this.setData({
          teacher: teacherList[i]
        })
      }
    }
  },

  /**
   * 根据授课老师Id匹配其所授课程列表
   */
  getTeachCourseList: function(tid){
    var courseList = [];
    var allCourseList = app.globalData.allCourseList;
    var len = allCourseList.length;
    for (var i = 0; i < len; i++){
      if (tid == allCourseList[i].teacher.id){
        courseList.push(allCourseList[i]);
      }
    }
    console.log("当前教师所授课程：");
    console.log(courseList);
    this.setData({
      clist: courseList
    })
  },

  /**
   * 老师简介/主授课程按钮导航切换
   */
  toTab: function (e) {
    var tab = e.currentTarget.dataset.index;
    this.setData({
      subTit: tab,
    })
  },

  /**
   * 转课程详情页
   */
  toShowDetail: function (event) {
    var ctype = event.currentTarget.dataset.ctype;
    var cid = event.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../course-detail/course-detail?type=' + ctype + '&id=' + cid,
    })
  },

})