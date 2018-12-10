
const app = getApp();
var utils = require("../../../utils/util.js");
var fuck;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:null  //课程信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程详情'
    })
    console.log('进入课程详情页');
    console.log(options);
    fuck = options.type;
    this.getCourseInfo(options.id);
    
  },
    
  /**
   * 根据id匹配获得当前课程信息
   */
  getCourseInfo: function(cid){
    console.log("进入getCourseInfo函数");
    //js中如果一个变量绑定到一个非基本数据类型(Array, Function, Object)，属于引用传递，采用深度复制拷贝(JSON.parse(JSON.stringify())可以防止改变原对象数据
    var allCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));  
    var myBookingList = JSON.parse(JSON.stringify(app.globalData.userBookingList));
    var len = allCourseList.length;
    var newCourse = null;
    for(var i=0;i<len;i++){
      if(cid == allCourseList[i].courseNo){
        console.log('详情页匹配到课程信息allCourseList['+ i +']: ');
        console.log(allCourseList[i]);
        newCourse = JSON.parse(JSON.stringify(allCourseList[i]));
        break;
      }
    }
    newCourse.teachTime = utils.changeTeachTimeStr(newCourse.teachTime);
    newCourse.isBooking = utils.judgeThisInBooking(newCourse.courseNo, myBookingList);
    this.setData({
      course: newCourse
    })
  },

  /**
   * 显示预约课程模态框
   */
  showBookingModal: function (e){
    console.log("进入showBookModal函数");
    var cid = e.currentTarget.dataset.cid;
    console.log(cid);
    var sid = wx.getStorageSync("sid");
    // 用来辨别用户是否交钱
    if(fuck=="t"){
      wx.showModal({
        title: '提示',
        content: '此为精品课需要付费，是否购买',
        success: res =>{
          if (res.confirm){
            wx.redirectTo({
              url: '../buy/buy?id=' + cid
            });
            // wx.showModal({
            //   title: '提示',
            //   content: '是否购买',
            //   success: res =>{
            //     if (res.confirm) {
            //        wx.showToast({
            //       title: '购买成功[模拟]',
            //       icon: 'success',
            //       duration: 1500
            //     });
            //     this.toBookingCourse(cid, sid);
            //      }
            //   }
                
            //   })
            
          //  wx.showToast({
          //   title: '购买成功',
          //    icon: 'success',
          //    duration: 2000
          // });
          //  this.toBookingCourse(cid, sid);
          } 
          else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{wx.showModal({
      title: '提示',
      content: '确定预约吗',
      success: res => {
        if (res.confirm) {
          this.toBookingCourse(cid, sid);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })}
  },

  /**
   * 显示取消预约模态框
   */
  showcancelBookModal: function(e){
    console.log("进入showcancelBookModal函数");
    var cid = e.currentTarget.dataset.cid;
    var sid = wx.getStorageSync("sid");
    wx.showModal({
      // title: '提示',
      content: '确定取消预约该课程吗',
      success: res => {
        if (res.confirm) {
          console.log("用户点击确定")
          this.toCancelBooking(cid, sid);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 取消预约
   */
  toCancelBooking: function(cid,sid){
    wx.request({
      url: app.globalData.serverUrl + '/cancelBookingCourse',
      data: {
        sid: sid,
        cid: cid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var isCancelOk = res.data.isCancelOk;
        if (isCancelOk) {
          // wx.showToast({
          //   title: '取消预约成功',
          //   icon: 'success',
          //   duration: 2000
          // });
          wx.showModal({
            content: '取消预约成功，课表已更新',
            confirmText: '我知道了',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          console.log("取消预约成功，app保存新的用户约课记录");
          app.globalData.userBookingList = res.data.userBookingRecord; //取消预约课程成功，保存新的用户约课记录

          console.log("取消预约成功,再次打印用户约课记录：");
          console.log(app.globalData.userBookingList);

          console.log("取消预约成功,准备向服务器重新获取全部课程信息...");
          this.getAllCourseList(cid);

        }
        else {
          wx.showModal({
            title: '操作提示',
            content: '取消预约失败,请重新点击',
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });

        }
      },
      fail: function () {
        console.log("用户取消预约课程失败");
      }
    })
  },

  /**
   * 预约课程
   */
  toBookingCourse: function(cid,sid){
    wx.request({
      url: app.globalData.serverUrl + '/bookingCourse',
      data: {
        sid: sid,
        cid: cid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var isBookingOk = res.data.isBookingOk;
        if(isBookingOk){
          // wx.showToast({
          //   title: '预约成功',
          //   icon: 'success',
          //   duration: 2000
          // });
          wx.showModal({
            // title: '提示',
            content: '恭喜您约课成功，课表已更新',
            confirmText: '我知道了',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          console.log("约课成功，app保存新的用户约课记录");
          app.globalData.userBookingList = res.data.userBookingRecord; //约课成功，保存新的用户约课记录
         
          console.log("约课成功,再次打印用户约课记录：");
          console.log(app.globalData.userBookingList);

          console.log("约课成功,准备向服务器重新获取全部课程信息...");
          this.getAllCourseList(cid);

        }
        else{
          wx.showModal({
            // title: '操作提示',
            content: '抱歉约课失败了,请重新点击预约',
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });

        }
      },
      fail: function () {
        console.log("用户预约课程失败");
      }
    })
  },

  /**
   * 获取全部课程信息函数
   */ 
  getAllCourseList: function (cid) {
    wx.request({
      url: app.globalData.serverUrl + '/getAllCourse',
      header: { 'content-type': 'application/json' },
      success: res => {
        app.globalData.allCourseList = res.data.allCourseList;
        // console.log("所有课程信息列表：");
        // console.log(app.globalData.allCourseList);
        app.globalData.eCourseList = utils.sortCourseList(app.globalData.allCourseList, "体验课");
        // console.log("体验课列表：");
        // console.log(app.globalData.eCourseList);
        app.globalData.tCourseList = utils.sortCourseList(app.globalData.allCourseList, "精品课");
        // console.log("精品课列表：");
        // console.log(app.globalData.tCourseList);
        console.log("重新加载全部课程信息完成，准备刷新页面数据：");
        this.getCourseInfo(cid);
      },
      fail: function () {
        console.log("全部课程信息请求失败!");
      }
    })
  },

  //电话
  toCall: function (e) {
    var phoneNum = app.globalData.agencyInfo.phoneNum;
    wx.makePhoneCall({
      phoneNumber: phoneNum //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 转去授课老师详情页
   */
  toShowTeacherDetail: function (event) {
    var tid = event.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../teacher-detail/teacher-detail?tid=' + tid,
    })
  },

  /**
   * 去课表页展示当前课程的课表
   * 注意：wx.switchTab: url 不支持 queryString
   * 思路：将需要传入的参数保存为全局变量，课表页 (schedule) 加载时取出该全局变量然后清除
   */
  goSchedule: function(e){
    console.log("进入goSchedule函数, 准备转去schedule页");
    var cid = e.currentTarget.dataset.cid;
    app.globalData.scheduleCid = cid;
    // console.log("全局变量中的scheduleNo：" + app.globalData.scheduleCid);
    wx.switchTab({
      url: '../../schedule/schedule',
    });
  },
  
  //视频实录播放控制
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

})