var util = require("../../utils/util.js");

Page({
  data: {
    value: '',
    robots: []
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var robots = wx.getStorageSync("robots") || [];
    robots.forEach(function (robot) {
      robot.chats.forEach(function (chat) {
        chat.time = util.timeFormat(chat.time);
      });
    });
    this.setData({
      robots: robots
    });
  },
  onInput: function (e) {
    this.data.value = e.detail.value;
  },
  addRobot: function () {
    var name = this.data.value;
    if(name.length === 0) return ;
    for(var item of this.data.robots) {
      if(item.name === name) {
        wx.showToast({
          title: '该机器人已经存在',
          icon: 'none'
        });
        return ;
      }
    }
    var robot = {
      name: name,
      avatarUrl: this.getAvatar(),
      chats: []
    };
    this.data.robots.push(robot);
    this.setData({
      robots: this.data.robots
    });
    wx.getStorage({
      key: 'robots',
      success: function(res) {
        var robots = res.data || [];
        robots.push(robot);
        wx.setStorage({
          key: 'robots',
          data: robots,
          success: function () {
            wx.showToast({
              title: '添加成功'
            });
          }
        })
      },
    })
  },
  openChat: function (e) {
    var index = e.currentTarget.dataset.in;
    wx.navigateTo({
      url: '../d2d/d2d?index='+index,
    });
  },
  getAvatar: function () {
    var list = ['001','002','003','004'];
    return '../../images/avatar/robot'+list.randomGet()+'.png';
  }
})