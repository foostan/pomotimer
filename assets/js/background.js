/**
 * class Timer
 */
var Timer = function(id) {
  this.id = id
  this.time_limit = 25 * 60
  this.start_time = null
}
Timer.prototype = {
  start: function() {
    this.start_time = parseInt((new Date)/1000)
  },
  reset: function() {
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
 * class Task
 */
var Task = function(title, description, state) {
  this.title = title || null
  this.description = description || null
  this.state = state || null
  this.pomodoro = 0
  this.toggle = false
}

/**
 * class TaskList
 */
var TaskList = function() {
  this.data = []
}
TaskList.prototype = {
  load: function() {
    var _this = this
    chrome.storage.sync.get("task_list", function(d) {
      _this.data = d.task_list
    });
  },
  add: function(task) {
    this.data.push(task)
  },
  save: function() {
    chrome.storage.sync.set({"task_list": this.data});
  }
}

/**
 * Request listener
 */
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if(request.id !== undefined) {
      var id = request.id
      if (!timers[id]) {
        timers[id] = new Timer(id)
      }
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
      case "getTaskList":
        sendResponse({task_list: task_list})
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

var task_list = new TaskList()
task_list.load()
//task_list.add(new Task("test1", "this is test", "today"))
//task_list.add(new Task("test2", "this is test", "today"))
//task_list.add(new Task("test3", "this is test", "today"))
//task_list.add(new Task("test3", "this is test", "today"))
//task_list.save()
