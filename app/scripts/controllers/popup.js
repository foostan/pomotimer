'use strict';

app.controller("popupCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {

    $scope.category = 'today';


    /* task */
    $scope.tm = taskManager;
    var tasks = $scope.tasks = $scope.tm.get();
    $scope.$watch('tasks', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.tm.put(tasks);
        }
    }, true);
    $scope.tm.resetCountToday(tasks);
    console.log(tasks);

    /* timer */
    $scope.pt = pomodoroTimer;
    var timer = $scope.timer = $scope.pt.get();
    $scope.$watch('timer', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pt.put(timer);
        }
    }, true);
    $scope.pt.updateTime();
    console.log(timer);

    /* validate */
    $scope.checkCountToday = function (task, data) {
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data > task.count_total || data < 0) {
            return "Please input " + task.count_total + " or less";
        }
    };

    $scope.checkCountTotal = function (task, data) {
        console.log(task.count_today)
        console.log(task.count_total)
        console.log(data)
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data < task.count_today || data < 0) {
            return "Please input " + task.count_total + " or over";
        }
    };
});
