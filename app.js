(function () {
  Array.prototype.randomGet = function () {
    var pos = Math.round(Math.random() * (this.length - 1));
    return this[pos];
  }
  Array.prototype.remove = function (item) {
    var pos = this.indexOf(item);
    if(pos !== -1) this.splice(pos, 1);
    return this;
  }
})();

App({
  userInfo: {},
  onLaunch: function () {
    var robots = wx.getStorageSync("robots") || [];
    wx.setStorageSync("robots", robots);
  }
})