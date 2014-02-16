'use strict';

function TodoCtrl($scope, TaskManager, PomodoroTimer) {
  $scope.category = 'today';
  $scope.tm = TaskManager;
  $scope.tasks = $scope.tm.tasks;
  $scope.timer = PomodoroTimer;

  $scope.resetPomodoro = function(task) {
    $scope.tm.resetWip(task);
  }

  $scope.toggleState = function(task) {
    $scope.tm.toggleState(task);
  }

  /* validate */
  $scope.checkCountToday = function(task, data) {
    if (data == null || data == NaN) {
      return "Please input a number";
    } else if (data > task.count_total) {
      return "Please input " + task.count_total + " or less";
    }
  };

  $scope.checkCountTotal = function(task, data) {
    if (data == null || data == NaN) {
      return "Please input a number";
    } else if (data < task.count_today) {
      return "Please input " + task.count_total + " or over";
    }
  };

}
