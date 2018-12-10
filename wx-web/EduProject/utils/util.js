const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 全部课程列表中取出体验课/精品课列表
 */
const sortCourseList = (allcourseList,flagStr) => {
  var courseList = [];
  var flag = null;
  if(flagStr=='体验课'){
    flag = 'e';
  }else{  //对应精品课
    flag = 't';
  }
  var len = allcourseList.length;
  for (var i = 0; i < len; i++) {
    if (allcourseList[i].courseClass == flag) {
      courseList.push(allcourseList[i]);
    }
  }
  return courseList;
}


/**
 * 判断某课程是否属于已预约课程
 */
const judgeThisInBooking = (courseNo, myBookingList) => {
  var len = myBookingList.length;
  var isBooking = false;
  for (var i = 0; i < len; i++) {
    if (courseNo == myBookingList[i].course.courseNo) {
      isBooking=true;
      break;
    }
  }
  return isBooking;
}


/**
 * 课表字符串拼接
 */
const changeTeachTimeStr = teachTime => {
  var str = '星期'+ teachTime.substr(0,1) +'第'+ teachTime.substr(1,1)+'节';
  return str;
}

/**
 * 筛选出当前星期的课程
 */
const getNowWeekCourseList = (nowWeek, courseList, todayWeek) => {
  var newCourseList = [];
  var len = courseList.length;
  for(var i=0;i<len;i++){
    var teachTime = courseList[i].teachTime;
    if (teachTime.slice(0, 1) == nowWeek.toString()){
      if (teachTime.slice(0, 1) == todayWeek.toString()){
        courseList[i].isTodayCourse = true;  //是否属于今天课程标识
      }else{
        courseList[i].isTodayCourse = false;
      }
      newCourseList.push(courseList[i]);
    }
  }
  return newCourseList;
}

/**
 * 判断课程是否已签到及是否已经结束
 */
const judgeRecordState = (courseList, signRecordList) => {
  // 取出今天已签到的课程ID数组
  var len = signRecordList.length;
  var signCourseNoList = [];
  for (var i = 0; i < len; i++) {
     signCourseNoList.push(signRecordList[i].courseNo); 
  }
  // 匹配已签到课程ID数组，若匹配成功则置已签到状态位为true
  var len2 = courseList.length;
  for(var i = 0; i < len2; i++) {
    if (signCourseNoList.indexOf(courseList[i].courseNo) == -1){
      courseList[i].isSign = false;

      //还未签到则判断上课时间是否已经结束
      var teachTimeStr = courseList[i].teachTime;  //缓存授课时间
      if ('1' == teachTimeStr.slice(1)) {  //授课时间以'1'结束，上午9:00-12:00
        var nowTime = new Date();
        var nowHours = nowTime.getHours();
        // 当前小时数>=12，已经结束
        if (nowHours >= 12) {
          courseList[i].courseTimeIsEnd = true;
        } else {
          courseList[i].courseTimeIsEnd = false;
        }
      }
      if ('2' == teachTimeStr.slice(1)) {  //授课时间以'2'结束，下午2:00-5:00
        var nowTime = new Date();
        var nowHours = nowTime.getHours();
        // 当前小时数>=17，已经结束
        if (nowHours >= 17) {
          courseList[i].courseTimeIsEnd = true;
        } else {
          courseList[i].courseTimeIsEnd = false;
        }
      }
    }else{
      courseList[i].isSign = true;
    }
  }
}



/**
 * 星期字符串转数字
 */
const judgeNowWeek = nowWeekStr => {
  // console.log("judgeNowWeek收到参数：");
  // console.log(nowWeekStr);
  var nowweek = 0;
  switch (nowWeekStr) {
    case "日":
      nowweek = 0; break;
    case "一":
      nowweek = 1; break;
    case "二":
      nowweek = 2; break;
    case "三":
      nowweek = 3; break;
    case "四":
      nowweek = 4; break;
    case "五":
      nowweek = 5; break;
    case "六":
      nowweek = 6; break;
  }
  // console.log("judgeNowWeek返回值：");
  // console.log(nowweek);
  return nowweek;
}

// 星期数字转字符串
const changeWeekToStr = needWeek => {
  var needWeekStr;
  switch (needWeek) {
    case 0:
      needWeekStr = "日"; break;
    case 1:
      needWeekStr = "一"; break;
    case 2:
      needWeekStr = "二"; break;
    case 3:
      needWeekStr = "三"; break;
    case 4:
      needWeekStr = "四"; break;
    case 5:
      needWeekStr = "五"; break;
    case 6:
      needWeekStr = "六"; break;
  }
  return needWeekStr;
}

/**
 * 课程授课时间字符串替换
 */
const changeTeachTime = courseList => {
  var newCourseList = [];
  var len = courseList.length;
  for (var i = 0; i < len; i++) {
    var teachTime = courseList[i].teachTime;
    if ('1' == teachTime.slice(1)) {
      teachTime = "上午 9:00-12:00";
    } else if ('2' == teachTime.slice(1)){
      teachTime = "下午 2:00-5:00";
    }
    courseList[i].teachTime = teachTime;
    newCourseList.push(courseList[i]);
  }
  return newCourseList;
}

// 获取全部课程信息函数
const getAllCourseList= function() {
  wx.request({
    url: app.globalData.serverUrl + '/getAllCourse',
    header: { 'content-type': 'application/json' },
    success: res => {
      app.globalData.allCourseList = res.data.allCourseList;
      console.log("所有课程信息列表：");
      console.log(app.globalData.allCourseList);
      app.globalData.eCourseList = this.sortCourseList(app.globalData.allCourseList, "体验课");
      console.log("体验课列表：");
      console.log(app.globalData.eCourseList);
      app.globalData.tCourseList = this.sortCourseList(app.globalData.allCourseList, "精品课");
      console.log("精品课列表：");
      console.log(app.globalData.tCourseList);
    },
    fail: function () {
      console.log("全部课程信息请求失败!");
    }
  })
}

module.exports = {
  formatTime: formatTime,
  sortCourseList: sortCourseList,
  changeTeachTimeStr: changeTeachTimeStr,
  judgeThisInBooking: judgeThisInBooking,
  getAllCourseList: getAllCourseList,
  getNowWeekCourseList: getNowWeekCourseList,
  judgeNowWeek: judgeNowWeek,
  changeTeachTime: changeTeachTime,
  judgeRecordState: judgeRecordState,
  changeWeekToStr: changeWeekToStr
  // judgeCourseTimeIsEnd: judgeCourseTimeIsEnd
}
