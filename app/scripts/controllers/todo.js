'use strict';

function TodoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.tasks = [
    {
      title: 'sample task',
      state: 'today',
      pomodoro_today: 1,
      pomodoro_total: 1,
      done: true,
      collapsed: 'isCollapsed'
    },
    {
      title: 'sample task',
      state: 'today',
      pomodoro_today: 1,
      pomodoro_total: 5,
      done: true,
      collapsed: '!isCollapsed'
    },
    {
      title: 'sample task',
      state: 'today',
      pomodoro_today: 1,
      pomodoro_total: 1,
      done: false,
      collapsed: '!isCollapsed'
    }
  ];

  $scope.checkTaskPomodoroToday = function(task, data) {
    if (data == null || data == NaN) {
      return "Please input a number";
    } else if (data > task.pomodoro_total) {
      return "Please input " + task.pomodoro_total + " or less";
    }
  };

  $scope.checkTaskPomodoroTotal = function(task, data) {
    if (data == null || data == NaN) {
      return "Please input a number";
    } else if (data < task.pomodoro_today) {
      return "Please input " + task.pomodoro_total + " or over";
    }
  };

  $scope.addTask = function() {
    $scope.tasks.unshift({
      title: '',
      pomodoro_total: null,
      pomodoro_today: null,
      done: false,
      collapsed: '!isCollapsed'
    });
  };

  $scope.delTask = function(i) {
    $scope.tasks.splice(i, 1);
  };
}
