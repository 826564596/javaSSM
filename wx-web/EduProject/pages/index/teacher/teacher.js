// pages/index/teacher/teacher.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherList:[]  //授课老师列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teacherList: app.globalData.teacherList
    })
  },

  /**
   * 转去老师详情页
   */
  toShowTeacherDetail:function(event){
    var tid = event.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../teacher-detail/teacher-detail?tid=' + tid,
    })
  }
})