
const app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({

  data: {
    agencyInfo: [], //获取的机构信息
  },

  onLoad: function (options) {
    this.setData({
      agencyInfo: app.globalData.agencyInfo
    });
  },

  onReady: function () {
    // this.playerMusicTap(); 
  },

  // 电话咨询
  toCall: function (e) {
    var phoneNum = app.globalData.agencyInfo.phoneNum;
    wx.makePhoneCall({
      phoneNumber: phoneNum //仅为示例，并非真实的电话号码
    })
  },

  // 绑定 播放/暂停 音乐事件
  playerMusicTap: function (event) {
    //当前当前是否有音乐在播放
    var isPause = backgroundAudioManager.paused;
    if (isPause == undefined || isPause == true) {
      backgroundAudioManager.title = '当你老了';
      backgroundAudioManager.coverImgUrl = '';
      backgroundAudioManager.src = 'http://p6clnndvb.bkt.clouddn.com/music-1.mp3';
    } else {
      backgroundAudioManager.pause();
    }

  }

})