Page({
  data: {
  
  },
  onGotUserInfo: function (e) {
    wx.showToast({
      title: '授权成功',
      complete: function () {
        wx.reLaunch({
          url: '../index/index',
        })
      }
    });
  }
})