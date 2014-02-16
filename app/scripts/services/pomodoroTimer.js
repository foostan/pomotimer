'use strict';

app.factory("PomodoroTimer", function() {
  var timelimit = 1500;
  var target_task = null;
  var start_time = null;

  return {
    timelimit: timelimit,
    start: function(task) {
      target_task = task;
      start_time = new Date();
    },
    stop: function(task) {
      target_task = null;
      start_time = null;
    }
  };
});
