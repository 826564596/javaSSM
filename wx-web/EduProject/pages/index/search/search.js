// pages/index/search/search.js
const app = getApp()
var utils = require("../../../utils/util.js");
var WxSearch = require('../../../wxSearchView/wxSearchView.js');

Page({

  data: {},

  onLoad: function (options) {
    var allCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
    var len = allCourseList.length;
    var hotKeyWords = [];  //热点词组
    var matchesWords = [];  //搜索匹配词组
    for (var i = 0; i < len; i++){
      if(i<3){
        hotKeyWords.push(allCourseList[i].courseName); //拿出前3门课程的名称作为热点词
      }
      matchesWords.push(allCourseList[i].courseName); //全部课程名称存入搜索匹配词组
    }
    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      hotKeyWords,
      matchesWords,
      // ['java入门', 'ajax跨域完全讲解', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      // ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    console.log("触发搜索回调函数 mySearchFunction，收到参数：" + value);
    var allCourseList = JSON.parse(JSON.stringify(app.globalData.allCourseList));
    var course = null;
    var len = allCourseList.length;
    for(var i=0;i<len;i++){
      if (value == allCourseList[i].courseName){
        course = allCourseList[i];
        break;
      }
    }
    if(course){
      console.log("成功匹配到一门课程：");
      console.log("正跳转去课程详情页");
      wx.navigateTo({
        url: '../course-detail/course-detail?type=' + course.courseClass + '&id=' + course.courseNo ,
      })
    }else{
      console.log("未匹配到课程");
      console.log("正跳转去no-result页");
      wx.navigateTo({
        url: '../no-result/no-result',
      })
    }
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    console.log("触发返回回调函数 myGobackFunction");
  }

 
})