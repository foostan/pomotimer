'use strict';


function TodoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.tasks = [
    {
      title: 'sample task',
      pomodoro_total: 1,
      pomodoro_today: 1,
      done: true,
      collapsed: 'isCollapsed'
    },
    {
      title: 'sample task',
      pomodoro_total: 5,
      pomodoro_today: 1,
      done: true,
      collapsed: '!isCollapsed'
    },
    {
      title: 'sample task',
      pomodoro_total: 2,
      pomodoro_today: 1,
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

}
