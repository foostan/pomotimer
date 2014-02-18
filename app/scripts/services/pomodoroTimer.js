'use strict';

app.factory("PomodoroTimer", function() {
  var POMODORO_TIME = 1500;
  var time = POMODORO_TIME;
  var target_task = null;
  var start_time = null;
  var running = false;

  return {
    time: time,
    running: running,
    start: function(task) {
      this.running = true;
      target_task = task;
      start_time = new Date();
    },
    stop: function(task) {
      this.running = false;
      target_task = null;
      start_time = null;
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
