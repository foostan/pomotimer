'use strict';

function TodoCtrl($scope, $interval, TaskManager, PomodoroTimer) {
  $scope.category = 'today';
  $scope.tm = TaskManager;
  $scope.tasks = $scope.tm.tasks;
  $scope.timer = PomodoroTimer;

  $scope.resetPomodoro = function(task) {
    $scope.tm.resetWip(task);
    $scope.timer.reset(task);
  }

  $scope.toggleState = function(task) {
    $scope.tm.toggleState(task);
  }



  var stop;
  $scope.limit = 10;
  $scope.time = $scope.limit;
  $scope.start = function() {
    // Don't start a new fight if we are already fighting
    if ( angular.isDefined(stop) ) return;
    $scope.start_time = parseInt((new Date)/1000);
 
    stop = $interval(function() {
      var now = parseInt((new Date)/1000);
      $scope.time = $scope.limit - (now - $scope.start_time);
      if($scope.time == 0) {
        $scope.stop();
      }

    }, 1000);
  };

  $scope.stop = function() {
      if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
      }
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
