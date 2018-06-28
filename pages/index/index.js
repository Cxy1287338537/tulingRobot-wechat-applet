Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    var node = this;
    wx.getSetting({
      success: function (res) {
        if(!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../login/login',
          });
        }
      }
    });
  },
  onReady: function () {
    var node = this;
    wx.getUserInfo({
      success: function (res) {
        node.setData({
          userInfo: res.userInfo
        });
        getApp().userInfo = res.userInfo;
      }
    })
  }
});