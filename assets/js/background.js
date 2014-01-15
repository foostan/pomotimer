/**
 * class Timer
 */
var Timer = function (id) {
  this.id = id
  this.time_limit = 25 * 60
  this.start_time = null
};

Timer.prototype = {
  start: function () {
    this.start_time = parseInt((new Date)/1000)
  },
  reset: function () {
    this.start_time = 0
  },
  getElapsedTime: function() {
    return this.start_time > 0 ? parseInt((new Date)/1000) - this.start_time : 0
  },
  getRemainingTime: function() {
    var t = this.time_limit - this.getElapsedTime()
    return t > 0 ? t : 0
  },
  isFinished:function() {
    return this.getRemainingTime() === 0 && this.start_time !== null
  },
  isRunning:function() {
    return this.start_time !== null
  },
  finish: function() {
    this.start_time = null
  }
}

/**
 * Request listener
 */
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var id = request.id
    if (!timers[id]) {
      timers[id] = new Timer(id)
    }

    switch (request.action) {
      case "start":
        timers[id].start()
        sendResponse({})
        break
      case "reset":
        timers[id].reset()
        sendResponse({})
        break
      case "getTimeLimit":
        sendResponse({time_limit: timers[id].time_limit})
        break
      default:
        sendResponse({})
        break
    }
  }
)

/**
 * main
 */
var timers = []
setInterval(function() {
  for(var id in timers){
    if (timers[id].isRunning()) {
      chrome.extension.sendRequest({
        id: id,
        action: "update_remaining_time",
        remaining_time: timers[id].getRemainingTime()
      });
    }
    if (timers[id].isFinished()) {
      timers[id].finish()
    }
  }
}, 1000)
