const app = getApp();
var utils = require("../../utils/util.js");

var nowT = new Date(); //获取今天日期

var nowY = nowT.getFullYear(); //年
var nowM = nowT.getMonth();

var nowdate = nowT.getDate();

var bmonth = nowM + 1
var month = bmonth < 10 ? '0' + bmonth : bmonth//月

nowT.setDate(nowT.getDate());
var dyT = [];
var dateTemp;
var flag = 1;

var mnT = [];
var monthTemp;

var wT = [];
var week;
var weekTemp;

var dateweek = [];

for (var i = 0; i < 7; i++) {
  dateTemp = nowT.getDate();
  var mn = nowT.getMonth() + 1;
  var monthTemp = mn < 10 ? '0' + mn : mn;

  dyT.push(dateTemp);
  mnT.push(monthTemp);
  //周几
  week = nowT.getDay();
  switch (week) {
    case 0:
      weekTemp = "日"; break;
    case 1:
      weekTemp = "一"; break;
    case 2:
      weekTemp = "二"; break;
    case 3:
      weekTemp = "三"; break;
    case 4:
      weekTemp = "四"; break;
    case 5:
      weekTemp = "五"; break;
    case 6:
      weekTemp = "六"; break;
  }
  wT.push(weekTemp);
  nowT.setDate(nowT.getDate() + flag);

  dateweek.push([wT[i], mnT[i], dyT[i]]);//周几,月份,日期
}


Page({

  data: {
    tabIndex: 1,  //导航标识(1我的，2所有)
    
    dateweekArr: dateweek,  //日期周几数组
    nowdy: nowdate,  //当前几号
    nowweek: dateweek[0][0],  //当前周几
    nowmn: month,  //几月
    needWeek: null,  //默认需要匹配的周几
  },

  onLoad: function (options) {
    console.log("来到schedule页");
  },

  onShow: function () {
    // var nowweek = nowT.getDay();  //取得周几  0:周日，1:周一
    console.log("onShow函数输出今天周几：" + this.data.nowweek);

    var scheduleCid = app.globalData.scheduleCid;
    console.log("onShow函数获取app.globalData.scheduleCid：" + scheduleCid);
    if (scheduleCid != null) {
      app.globalData.scheduleCid = null; //拿到后立即清除该变量
      console.log("准备匹配课程");
      var course = this.getThisCourse(scheduleCid);
      console.log("匹配的课程信息：");
      console.log(course);
      var needWeek = parseInt(course.teachTime.slice(0, 1));
      console.log("解析到的needWeek：" + needWeek);
      this.data.needWeek = needWeek;  //保存要匹配的周几
      
      var needWeekStr = utils.changeWeekToStr(needWeek);
      console.log("needWeekStr：" + needWeekStr);
      this.setData({
        tabIndex: 1,
        nowweek: needWeekStr,
        needShowCourseId: scheduleCid
      })
    }else{
      this.setData({
        needShowCourseId: null
      })
    }

    this.getClassList();//请求加载数据(默认我的课表)
  },

  /**
   * 根据星期和分类加载数据列表
   */
  getClassList: function () {
    var nowWeekStr = this.data.nowweek;
    var nowWeek;
    if(this.data.needWeek != null){
      nowWeek = this.data.needWeek;
      // this.setData({  //拿到后清除
      //   needWeek:null
      // })
      this.data.needWeek = null;  //拿到后清除
    }else{
      nowWeek = utils.judgeNowWeek(nowWeekStr);
    }
    console.log("getClassList函数输出需要匹配的周几：" + nowWeek);
    var tabIndex = this.data.tabIndex;
    var todayWeek = nowT.getDay();  //今天周几
    console.log("getClassList函数输出今天周几：" +todayWeek);
    var signRecordList = JSON.parse(JSON.stringify(app.globalData.userSignRecordList));  //拿到用户今天的签到记录

    var myCourseList = [];
    if(tabIndex == 1 ) {  //我的课表
      var myBookings = JSON.parse(JSON.stringify(app.globalData.userBookingList));
      var len = myBookings.length;
      for(var i=0;i<len;i++){
        myBookings[i].course.isBooking = true;  //所有已预约课程设置已预约标识
        myBookings[i].course.signNum = myBookings[i].signNum;  //签到次数赋值 
        myBookings[i].course.progress = myBookings[i].progress;  //学习进度赋值
        myBookings[i].course.checkState = myBookings[i].checkState;  //考核状态赋值
        myCourseList.push(myBookings[i].course);
      }

    } else if (tabIndex == 2){  //所有课表
      myCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
      var myBookings = JSON.parse(JSON.stringify(app.globalData.userBookingList));
      var clen = myCourseList.length;
      var blen = myBookings.length;
      for(var i=0;i<clen;i++){
        for(var j=0;j<blen;j++){
          if (myCourseList[i].courseNo == myBookings[j].course.courseNo){
            myCourseList[i].isBooking = true;  //全部课程列表与已预约课程列表比较，设置已预约标识
            myCourseList[i].signNum = myBookings[j].signNum;  //签到次数赋值 
            myCourseList[i].progress = myBookings[j].progress;  //学习进度赋值
            myCourseList[i].checkState = myBookings[j].checkState;  //考核状态赋值
          }
        }
      }
      // myCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
      todayWeek = 8; //置今天周8，点击所有课表不显示签到按钮
    }
    // 筛选当天的课程
    var nowWeekCourseList = utils.getNowWeekCourseList(nowWeek, myCourseList, todayWeek);

    // if (tabIndex == 1 && todayWeek == nowWeek && signRecordList.length != 0){
    if (tabIndex == 1 && todayWeek == nowWeek) {
      // 匹配今天已经签到的课程列表，设置标识(是否已签到/未签到是否已结束)
      utils.judgeRecordState(nowWeekCourseList, signRecordList);
    }

    // 替换当天每门课程的授课时间字符串
    nowWeekCourseList = utils.changeTeachTime(nowWeekCourseList);

    console.log("当前星期课程：");
    console.log(nowWeekCourseList);
    this.setData({
      cList: nowWeekCourseList
    })
  },

  //切换时间（日期周几）
  timeGet: function (e) {
    var week = e.currentTarget.dataset.week;
    var month = e.currentTarget.dataset.month;
    var date = e.currentTarget.dataset.date;
    this.setData({
      nowmn: month,
      nowdy: date,
      nowweek: week,
      needShowCourseId: null
    })
    this.getClassList();//加载数据
  },

  //切换分类选项卡（我的、全部）
  onTabChangeTap: function (e) {
    const that = this;
    var index = e.currentTarget.dataset.tabIndex;

    that.setData({
      tabIndex: index,
      needShowCourseId: null
    });

    that.getClassList();//加载数据
  },

  // <前去选课>按钮绑定事件：去课程列表页
  toShowCourse: function (event){
    wx.navigateTo({
      url: '../index/cmore/cmore?type=tCourse',
    })
  },

  // 申请考核按钮绑定事件
  toCheckCourse: function (e){
    console.log("进入toCheckCourse函数");
    var cid = e.currentTarget.dataset.cid;
    var sid = wx.getStorageSync("sid");
    wx.showModal({
      content: "确定申请考核吗?",
      success: res => {
        if (res.confirm) {
          this.toRequestCheck(sid, cid);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 签到按钮绑定事件(先时效判断，再进行签到)
  toSign: function (e) {
    console.log("进入toSign函数");
    var cid = e.currentTarget.dataset.cid;
    var thisCourse = this.getThisCourse(cid); //拿到当前课程
    console.log("打印已获取的当前课程：");
    console.log(thisCourse);
    var judgeSignTimeCode = this.judgeSignTime(thisCourse.teachTime);
    console.log("签到状态码judgeSignTimeCode：" + judgeSignTimeCode);
    if (judgeSignTimeCode != 1){ //无法签到，弹出提示框
      this.showPromptModal(judgeSignTimeCode);
    }else{ //向后台发送签到请求
      var sid = wx.getStorageSync("sid");
      this.toRequestSign(sid, cid);
    }
  },

  // 判断签到时间，返回签到状态码(0:过早/1:按时/2:已结束)
  judgeSignTime: function(teachTime){
    console.log("进入judgeSignTime函数，收到授课时间参数：" + teachTime);
    var witchTime = teachTime.split(',');
    var now = new Date();
    var nowHours = now.getHours();
    var nowDays = now.getDay();
    var c = 0;
    for (var key in witchTime) {
      var days = parseInt(parseInt(witchTime[key]) / 10);
      var time = parseInt(parseInt(witchTime[key]) % 10);
      if (days == nowDays) {
        if (time == 1) {  //上午8:00-12:00
          if (nowHours < 8) {
            c = 0;
            break;
          } else {
            if (nowHours < 12) {
              c = 1; break;
            } else if(nowHours<14){
              c = 2; break;
            }
          }
        } else if (time == 2) {  //下午2:00-5:00

          if (nowHours < 14) {
            c = 0; break;
          } else {
            if (nowHours >= 17) {
              c = 2; break;
            } else {
              c = 1; break;
            }
          }
        }
      }
    }
    return c;
    
  },

  // 按参数显示提示框
  showPromptModal: function(stateCode){
    console.log("showPromptModal函数收到参数stateCode：" + stateCode);
    var contentStr = null;
    if (stateCode == 0){
      contentStr = "未到上课时间，稍后再试";
    } else if (stateCode == 2){
      contentStr = "这节课程已结束";
    } else if (stateCode == 1){
      contentStr = "可以发送签到请求";
    }
    wx.showModal({
      // title: '操作提示',
      content: contentStr,
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
  },

  // 向后台发送申请考核请求
  toRequestCheck: function(sid, cid){
    wx.request({
      url: app.globalData.serverUrl + '/applyCheckCourse',
      data: {
        sid: sid,
        cid: cid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var isApplyCheckOk = res.data.isApplyCheckOk;
        if (isApplyCheckOk) {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 3000
          });

          console.log("申请考核成功，app.js保存新的约课记录");
          app.globalData.userBookingList = res.data.userBookingRecord; //签到成功，保存新的用户约课记录

          console.log("申请考核成功,再次打印用户约课记录：");
          console.log(app.globalData.userBookingList);

          console.log("申请考核成功,刷新页面数据...");
          this.getClassList();
        }
        else {
          wx.showModal({
            title: '操作提示',
            content: '申请考核失败,请重新点击',
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
        console.log("操作失败");
      }
    })
  },

  // 向后台发送签到请求
  toRequestSign: function(sid, cid){
    wx.request({
      url: app.globalData.serverUrl + '/signCourse',
      data: {
        sid: sid,
        cid: cid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var isSignOk = res.data.isSignOk;
        if (isSignOk) {
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 3000
          });

          console.log("签到成功，app.js保存新的用户签到记录和约课记录");
          app.globalData.userSignRecordList = res.data.userSignRecord; //签到成功，保存新的用户今天的签到记录
          app.globalData.userBookingList = res.data.userBookingRecord; //签到成功，保存新的用户约课记录

          console.log("签到成功,再次打印用户签到记录：");
          console.log(app.globalData.userSignRecordList);

          console.log("签到成功,再次打印用户约课记录：");
          console.log(app.globalData.userBookingList);

          console.log("签到成功,刷新页面数据...");
          this.getClassList();

        }
        else {
          wx.showModal({
            title: '操作提示',
            content: '签到失败,请重新点击签到',
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
        console.log("用户课程签到失败");
      }
    })
  },

  toBooking: function(event){
    var ctype = event.currentTarget.dataset.ctype;
    var cid = event.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../index/course-detail/course-detail?type=' + ctype + '&id=' + cid,
    })
  },

  // 根据课程号匹配到当前课程(签到按钮)
  getThisCourse: function(cid){
    var thisCourse = null;
    var allCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
    var len = allCourseList.length;
    for (var i = 0; i < len; i++) {
      if (cid == allCourseList[i].courseNo) {
        thisCourse = allCourseList[i];
      }
    }
    return thisCourse;
  }

})