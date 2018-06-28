function toDouble (n) {
  n = String(n);
  return n.length < 2 ? "0"+n : n;
}


function isSameWeek(old, now) {
  var oneDayTime = 1000 * 60 * 60 * 24;
  var old_count = parseInt(old.getTime() / oneDayTime);
  var now_other = parseInt(now.getTime() / oneDayTime);
  return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}

function timeFormat (timestamp) {
  var now = new Date(), date = new Date(timestamp);
  var day = ['日','一','二','三','四','五','六'];
  // 不是同一年
  if(now.getFullYear() !== date.getFullYear()) {
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
  } // 同一天
  else if (date.toDateString() === now.toDateString()){
    return `${toDouble(date.getHours())}:${toDouble(date.getMinutes())}`;
  } // 同一周
  else if (isSameWeek(date, now)) {
    return `周${day[date.getDay()]}`;
  }
  else {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
}

function viewMsgFormat (msg) {
  return {
    source: msg.source,
    content: msg.content,
    time: timeFormat(msg.time)
  }
}

module.exports = {timeFormat, viewMsgFormat};