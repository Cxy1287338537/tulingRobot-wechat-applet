var util = require("../../utils/util.js");

Page({
  data: {
    value: '',
    scrollTop: 0,
    isFocus: false,
    index: -1,
    robot: {},
    userInfo: {},
  },
  onLoad: function (options) {
    options.index = options.index || 0;
    var pages = getCurrentPages();
    var robot = pages[pages.length - 2].data.robots[options.index];
    this.setData({
      robot: robot,
      index: options.index,
      userInfo:getApp().userInfo,
      scrollTop: 100*robot.chats.length
    });
    wx.setNavigationBarTitle({
      title: robot.name,
    });
  },
  onFocus: function () {
    this.setData({isFocus: true});
  },
  onBlur: function () {
    this.setData({isFocus: false});
  },
  onInput: function (e) {
    this.setData({
      value: e.detail.value
    });
  },
  send: function () {
    var node = this;
    var msg = this.data.value;
    var msgPack = {
      source: true,
      content: msg,
      time: Date.now(),
    };
    var view_msgPack = util.viewMsgFormat(msgPack);
    this.data.robot.chats.push(view_msgPack);
    this.setData({
      value: '',
      robot: this.data.robot,
      scrollTop: 100 * node.data.robot.chats.length
    });
    wx.request({
      url: 'https://route.showapi.com/60-27',
      data: {
        showapi_appid: 68354,
        showapi_sign: "255dd762226b4cb689d9b5c244374e81",
        info: msg,
        userid: getApp().userInfo.nickName + node.data.robot.name
      },
      success: function (res) {
        var res_msg = res.data.showapi_res_body.text;
        var res_msgPack = {
          source: false,
          content: res_msg,
          time: Date.now()
        };
        var view_res_msgPack = util.viewMsgFormat(res_msgPack);
        node.data.robot.chats.push(view_res_msgPack);
        setTimeout(function () {
          node.setData({
            robot: node.data.robot,
            scrollTop: 100 * node.data.robot.chats.length
          }, function () {
            var pages = getCurrentPages();
            var robots = pages[pages.length - 2].data.robots;
            robots[node.data.index].chats.push(view_msgPack);
            robots[node.data.index].chats.push(view_res_msgPack);
            pages[pages.length - 2].setData({
              robots: robots
            });
          });
          wx.getStorage({
            key: 'robots',
            success: function(res) {
              res.data[node.data.index].chats.push(msgPack);
              res.data[node.data.index].chats.push(res_msgPack);
              wx.setStorage({
                key: 'robots',
                data: res.data,
              })
            },
          });
        }, 1000);
      },
      error: function () {
        wx.showToast({
          title: '发送失败',
          icon: "none"
        });
        node.data.robot.chats.remove(view_msgPack);
        node.setData({robot: node.data.robot});
      }
    });
  }
});