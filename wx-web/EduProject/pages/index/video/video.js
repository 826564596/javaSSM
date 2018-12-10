
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vlist:[] //当前视频实录列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '视频实录'
    });
    this.getVideoList();
  },

  // 获取视频课程列表
  getVideoList: function(){
    var courseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
    var length = courseList.length;
    var vlist = [];
    var hasMoreVideo = false;  //默认当前页没有更多数据
    var pageNo = 1;  //默认当前分页页码为1
    if (length > 2) {  //每页展示两个视频
      vlist = courseList.slice(0, 2);
      console.log("第一个分页数据：");
      console.log(vlist);
      hasMoreVideo = true;
    } else {
      vlist = courseList;
    }
    this.setData({
      vlist: vlist,
      hasMoreVideo: hasMoreVideo,
      pageNo: pageNo  
    })
    
  },

  // 上一页/下一页
  showOther: function (e) {
    console.log("进入showOther函数");
    var courseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
    var length = courseList.length;
    var vlist = [];
    var pageNo = this.data.pageNo;
    var hasMoreVideo = false;
    if (e.currentTarget.dataset.type =="previous"){  //上一页
      vlist = courseList.slice((pageNo-1)*2-2, (pageNo-1)*2);
      hasMoreVideo = true;  //必定还有其它数据
      pageNo--;  //当前页数减1
    } 
    else{  //下一页
      if ((length - pageNo * 2) > 2) {  //还有大于2条数据
        vlist = courseList.slice(pageNo*2, (pageNo + 1) * 2);
        hasMoreVideo = true;
      }else if ((length - pageNo * 2) == 2){  //刚好还有2条数据，不能再分页
        vlist = courseList.slice(pageNo * 2, length);
      }else{
        vlist = courseList.slice(pageNo * 2);  //只剩下1条数据，不能再分页
      }
      pageNo++; //当前页数加1
    }
    console.log("第" + pageNo + "个分页数据：");
    console.log(vlist);
    
    this.setData({
      vlist: vlist,
      hasMoreVideo: hasMoreVideo,
      pageNo: pageNo
    })
  },

  // 转课程详情页
  toShowDetail: function (event) {
    var ctype = event.currentTarget.dataset.ctype;
    var cid = event.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../course-detail/course-detail?type=' + ctype + '&id=' + cid,
    })
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


})