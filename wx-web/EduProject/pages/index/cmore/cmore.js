
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseType:'',  //课程类型
    courseList:[] //当前页面课程信息列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('来到cmore页面初始化参数：');
    console.log(options);
    var ctype = options.type;
    //动态设置当前页面的标题（可更改title的名称来更改本页头部标题）
    wx.setNavigationBarTitle({
      title: ctype == 'tCourse' ? '精品课程' : '体验课程'
    })
    
    this.getCourseList(ctype);
  },

  /**
   * 根据课程类型参数获取对应全部课程
   */
  // getCourseList: function(ctype){
  //   this.setData({
  //     courseType: ctype,
  //     courseList: ctype == 'tCourse' ? app.globalData.tCourseList : app.globalData.eCourseList
  //   })
  // },
  getCourseList: function (ctype) {
    console.log("开始分页加载课程列表：");
    var thisCourseList = (ctype == 'tCourse' ? app.globalData.tCourseList : app.globalData.eCourseList);
    var length = thisCourseList.length;
    console.log("当前全部课程列表长度：" + length);
    var courseList = [];
    var hasMoreCourse = false;  //默认当前页没有更多数据
    var pageNo = 1;  //默认当前分页页码为1
    if(length>3){
      courseList = thisCourseList.slice(0,3);
      console.log("第一个分页数据：");
      console.log(courseList);
      hasMoreCourse = true;
    }else{
      courseList = thisCourseList;
    }
    this.setData({
      courseType: ctype,
      courseList: courseList,
      hasMoreCourse: hasMoreCourse,
      pageNo: pageNo
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

  showMore: function(){
    console.log("进入showMore函数");
    // if(this.data.hasMoreCourse){  //若还有更多数据
      var ctype = this.data.courseType;
      var thisCourseList = (ctype == 'tCourse' ? app.globalData.tCourseList : app.globalData.eCourseList);
      var length = thisCourseList.length;
      var pageNo = this.data.pageNo;
      var hasMoreCourse = false;
      var courseList = [];
      if ((length-pageNo*3) > 3) {
        courseList = thisCourseList.slice(0, pageNo*3+1);
        hasMoreCourse = true;
      } else {
        courseList = thisCourseList;
      }
      this.setData({
        courseType: ctype,
        courseList: courseList,
        hasMoreCourse: hasMoreCourse,
        pageNo: pageNo+1
      })
    }
  // }

})