'use strict';

app.factory("PomodoroTimer", function() {
  var POMODORO_TIME = 1500;
  var time = POMODORO_TIME;
  var target_task = null;
  var start_time = null;
  var isRunning = false;

  return {
    getTime: function() { 
      if (start_time == null) {
        return POMODORO_TIME;
      } else {
        var now = parseInt((new Date)/1000);
        return POMODORO_TIME - (now - start_time)
      }
    },
    getStartTime: function() { return start_time; },
    isRunning: function() { return isRunning; },
    isFinished: function() {
      return isRunning && this.getTime() <= 0 ? true : false;
    },
    start: function(task) {
      target_task = task;
      start_time = parseInt((new Date)/1000);
      isRunning = true;
    },
    stop: function(task) {
      target_task = null;
      start_time = null;
      isRunning = false;
    },
    finish: function(task) {
      this.stop(task);
    },
    reset: function(task) {
      time = POMODORO_TIME;
      target_task = task;
    }
  };
});
